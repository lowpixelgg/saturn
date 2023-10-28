import { IProfilesRepository } from '@modules/http/social/repositories/IProfilesRepository';
import { getFileKey } from '@infra/http/helpers/gcloud-helpers';
import BucketName from '@infra/libs/gcloud/storage';
import { Either, left, right } from '@core/logic/Either';
import { ContentAvatarError } from './errors/ContentAvatarError';
import { ContentUserNotExist } from './errors/ContentUserNotExist';
import GoogleStorage from '@infra/services/gcs/GoogleStorage';
import { isLimitReached } from '@utils/isLimiteReached';
import saturnConfig from '@configs/saturn.config';
import { ContentFileIsTooLarge } from './errors/ContentFileIsTooLarge';

type ContentAvatarRequest = {
  file: Express.Multer.File;
  id: string;
};

type FileResponse = {
  file: string;
};

type ContentAvatarResponse = Either<
  ContentUserNotExist | ContentFileIsTooLarge | ContentAvatarError,
  FileResponse
>;

export class ContentBanner {
  constructor(private profilesRepository: IProfilesRepository) {}

  async execute({
    id,
    file,
  }: ContentAvatarRequest): Promise<ContentAvatarResponse> {
    if (!file) {
      return left(new ContentAvatarError());
    }

    if (isLimitReached(saturnConfig.limits, file)) {
      return left(new ContentFileIsTooLarge());
    }

    const exists = await this.profilesRepository.exists(id);

    if (!exists) {
      return left(new ContentUserNotExist());
    }

    const profile = await this.profilesRepository.findOne(id);

    // For now, delete user's avatar if already have a custom.
    const { folder, key } = getFileKey(profile.banner);

    const alreadyExistsAvatar = await BucketName.file(
      `${folder}/${key}`
    ).exists();

    if (alreadyExistsAvatar[0]) {
      BucketName.file(`${folder}/${key}`).delete();
    }

    try {
      const upload = await GoogleStorage.upload(file, 'banners');

      profile.setBannerURL = upload.url;
      await this.profilesRepository.save(profile);

      return right({
        file: upload.url,
      });
    } catch (error) {
      return left(error);
    }
  }
}
