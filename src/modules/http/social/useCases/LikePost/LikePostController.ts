import { IPostsRepository } from '@modules/http/social/repositories/IPostsRespository';
import { Controller } from '@core/infra/Controller';
import {
  clientError,
  HttpResponse,
  notFound,
  ok,
} from '@core/infra/HttpResponse';
import { LikePostDoesNotExist } from './errors/LikePostDoesNotExist';
import { LikePost } from './LikePost';

type LikePostRequest = {
  postId: string;
  user: { id: string };
  unlike: boolean;
};

export class LikePostController implements Controller {
  constructor(private likePost: LikePost) {}

  async handle({
    postId,
    user,
    unlike,
  }: LikePostRequest): Promise<HttpResponse> {
    const result = await this.likePost.execute({
      authorId: user.id,
      postId,
      unlike: Boolean(unlike),
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case LikePostDoesNotExist:
          return notFound(error);
        default:
          return clientError(error);
      }
    } else {
      return ok(result.value);
    }
  }
}
