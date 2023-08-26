import { Controller } from '@core/infra/Controller'
import {
  clientError,
  HttpResponse,
  notFound,
  ok,
} from '@core/infra/HttpResponse'
import { CreateComment } from './CreateComment'
import { CommentCommentPostNotExist } from './errors/CreateCommentPostNotExist'

type CreateCommentRequest = {
  postId: string
  content: string
  user: { id: string }
}

export class CreateCommentController implements Controller {
  constructor(private createComment: CreateComment) {}

  async handle({
    postId,
    content,
    user,
  }: CreateCommentRequest): Promise<HttpResponse> {
    const result = await this.createComment.execute({
      postId,
      content,
      user,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case CommentCommentPostNotExist:
          return notFound(error)
        default:
          return clientError(error)
      }
    } else {
      return ok(result.value)
    }
  }
}
