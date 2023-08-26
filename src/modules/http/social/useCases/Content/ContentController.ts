import { User } from '@modules/http/accounts/domain/user/user'
import { Controller } from '@core/infra/Controller'
import {
  clientError,
  fail,
  HttpResponse,
  notFound,
  ok,
} from '@core/infra/HttpResponse'
import { request } from 'express'
import { ContentAvatar } from './Avatar'
import { ContentBanner } from './Banner'
import { ContentAvatarError } from './errors/ContentAvatarError'
import { ContentUserNotExist } from './errors/ContentUserNotExist'

type ContentAvatarRequest = {
  image: string
  extension: string
  avatar: boolean
  banner: boolean
  user: { id: string }
}

export class ContentController implements Controller {
  constructor(
    private avatarContent: ContentAvatar,
    private bannerContent: ContentBanner
  ) {}

  private async handleUpdateAvatar(
    image: string,
    extension: string,
    id: string
  ): Promise<HttpResponse> {
    const result = await this.avatarContent.execute({
      image,
      extension,
      id,
    })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case ContentAvatarError:
          return clientError(error)
        case ContentUserNotExist:
          return notFound(error)
        default:
          return fail(error)
      }
    } else {
      return ok(result.value)
    }
  }

  private async handleUpdateBanner(
    image: string,
    extension: string,
    id: string
  ): Promise<HttpResponse> {
    const result = await this.bannerContent.execute({
      image,
      extension,
      id,
    })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case ContentAvatarError:
          return clientError(error)
        case ContentUserNotExist:
          return notFound(error)
        default:
          return fail(error)
      }
    } else {
      return ok(result.value)
    }
  }

  async handle({
    image,
    extension,
    avatar,
    banner,
    user,
  }: ContentAvatarRequest): Promise<HttpResponse> {
    if (Boolean(avatar)) {
      return this.handleUpdateAvatar(image, extension, user.id)
    } else if (Boolean(banner)) {
      return this.handleUpdateBanner(image, extension, user.id)
    } else {
      return ok({})
    }
  }
}
