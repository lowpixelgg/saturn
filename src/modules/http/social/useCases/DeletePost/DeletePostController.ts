import { Controller } from '@core/infra/Controller';
import {
  clientError,
  forbidden,
  HttpResponse,
  notFound,
  ok,
} from '@core/infra/HttpResponse';
import { DeletePost } from './DeletePost';
import { PostDoesNotExist } from './errors/PostDoesNotExist';
import { PermissionDenied } from '@infra/http/errors/PermissionDenied';

type DeletePostRequest = {
  postId: string;
  user: { id: string };
};

export class DeletePostController implements Controller {
  constructor(private deletePost: DeletePost) {}

  async handle({ user, postId }: DeletePostRequest): Promise<HttpResponse> {
    const result = await this.deletePost.execute({ user, postId });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case PostDoesNotExist:
          return notFound(error);

        case PermissionDenied:
          return forbidden(error);
        default:
          return clientError(error);
      }
    } else {
      return ok({});
    }
  }
}
