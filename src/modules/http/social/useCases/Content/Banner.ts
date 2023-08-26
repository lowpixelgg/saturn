import { IProfilesRepository } from '@modules/http/social/repositories/IProfilesRepository'
import { getFileKey, publicURL } from '@infra/http/helpers/gcloud-helpers'
import BucketName from '@infra/libs/gcloud/storage'
import { Either, left, right } from '@core/logic/Either'
import { ContentAvatarError } from './errors/ContentAvatarError'
import { ContentUserNotExist } from './errors/ContentUserNotExist'
import isUrl from '@utils/isURL'

type ContentBannerRequest = {
  image: string
  extension: string
  id: string
}

type FileResponse = {
  file: string
}

type ContentBannerResponse = Either<
  ContentUserNotExist | ContentAvatarError,
  FileResponse
>

export class ContentBanner {
  constructor(private profilesRepository: IProfilesRepository) { }

  async execute({
    extension,
    image,
    id,
  }: ContentBannerRequest): Promise<ContentBannerResponse> {
    if (!extension || !image) {
      return left(new ContentAvatarError())
    }

    const exists = this.profilesRepository.exists(id)

    if (!exists) {
      return left(new ContentUserNotExist())
    }

    const profile = await this.profilesRepository.findOne(id)

    // Prevent if the imagem is not a base64
    if (isUrl(image)) {
      profile.setBannerURL = image
      await this.profilesRepository.save(profile)

      return right({
        file: image,
      })
    }

    // For now, delete user's avatar if already have a custom.
    const { bucket, folder, key } = getFileKey(profile.banner)

    if (folder !== 'default') {
      const exists = await BucketName.file(`${folder}/${key}`).exists()

      if (exists[0]) {
        BucketName.file(`${folder}/${key}`).delete()
      }
    }

    const b64 = image.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(b64, 'base64')

    const fileName = `banners/${Date.now()}.${extension}`
    const file = BucketName.file(fileName)

    await file.save(buffer)
    await file.makePublic()

    profile.setBannerURL = publicURL(fileName, BucketName.name)

    await this.profilesRepository.save(profile)



    return right({
      file: publicURL(fileName, BucketName.name),
    })
  }
}
