import { Controller } from '@core/infra/Controller';
import {
  clientError,
  fail,
  HttpResponse,
  notFound,
  ok,
  tooLarge,
} from '@core/infra/HttpResponse';
import { ContentAvatar } from './Avatar';
import { ContentBanner } from './Banner';
import { ContentAvatarError } from './errors/ContentAvatarError';
import { ContentUserNotExist } from './errors/ContentUserNotExist';
import { ContentFileIsTooLarge } from './errors/ContentFileIsTooLarge';

type ContentAvatarRequest = {
  file: Express.Multer.File;
  avatar?: boolean;
  banner?: boolean;
  user: { id: string };
};

export class ContentController implements Controller {
  constructor(
    private avatarContent: ContentAvatar,
    private bannerContent: ContentBanner
  ) {}

  private async handleUpdateAvatar(
    file: Express.Multer.File,
    id: string
  ): Promise<HttpResponse> {
    const result = await this.avatarContent.execute({
      file,
      id,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case ContentAvatarError:
          return clientError(error);
        case ContentUserNotExist:
          return notFound(error);
        case ContentFileIsTooLarge:
          return tooLarge(error);
        default:
          return fail(error);
      }
    } else {
      return ok(result.value);
    }
  }

  private async handleUpdateBanner(
    file: Express.Multer.File,
    id: string
  ): Promise<HttpResponse> {
    const result = await this.bannerContent.execute({
      file,
      id,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case ContentAvatarError:
          return clientError(error);
        case ContentUserNotExist:
          return notFound(error);
        case ContentFileIsTooLarge:
          return tooLarge(error);
        default:
          return fail(error);
      }
    } else {
      return ok(result.value);
    }
  }

  async handle({
    file,
    avatar,
    banner,
    user,
  }: ContentAvatarRequest): Promise<HttpResponse> {
    if (Boolean(avatar)) {
      return this.handleUpdateAvatar(file, user.id);
    } else if (Boolean(banner)) {
      return this.handleUpdateBanner(file, user.id);
    } else {
      return ok({});
    }
  }
}
