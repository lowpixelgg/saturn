import { Controller } from '@core/infra/Controller'
import {
  clientError,
  HttpResponse,
  notFound,
  ok,
} from '@core/infra/HttpResponse'
import { DeletePost } from './DeletePost'
import { PostDoesNotExist } from './errors/PostDoesNotExist'

type DeletePostRequest = {
  postId: string
}

export class DeletePostController implements Controller {
  constructor(private deletePost: DeletePost) {}

  async handle({ postId }: DeletePostRequest): Promise<HttpResponse> {
    const result = await this.deletePost.execute({ postId })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case PostDoesNotExist:
          return notFound(error)
        default:
          return clientError(error)
      }
    } else {
      return ok({})
    }
  }
}
