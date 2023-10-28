import { Either, left, right } from '@core/logic/Either';
import { IsTooLarge } from './errors/IsTooLarge';
import GoogleStorage from '@infra/services/gcs/GoogleStorage';
import { update } from 'lodash';
import { MissingArguments } from './errors/MissingArguments';
import { isLimitReached } from '@utils/isLimiteReached';
import saturnConfig from '@configs/saturn.config';

type AttachmentRequest = {
  file: Express.Multer.File | string;
  folder: string;
};

type Attachment = {
  url: string;
  key: string;
};

type AttachmentResponse = Either<IsTooLarge | MissingArguments, Attachment>;

export class Attachments {
  constructor() {}

  async execute({
    file,
    folder,
  }: AttachmentRequest): Promise<AttachmentResponse> {
    if (!file || !folder) {
      return left(new MissingArguments());
    }

    // Bake Base64 upload
    if (typeof file == 'string') {
      try {
        const upload = await GoogleStorage.uploadBase64(file, folder);

        return right({
          url: upload.url,
          key: upload.fileKey,
        });
      } catch (error) {
        return left(error);
      }
    } else {
      if (isLimitReached(saturnConfig.limits, file)) {
        return left(new IsTooLarge());
      }

      const upload = await GoogleStorage.upload(file, folder);

      return right({
        url: upload.url,
        key: upload.fileKey,
      });
    }
  }
}
