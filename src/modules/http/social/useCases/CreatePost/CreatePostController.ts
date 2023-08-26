import { Controller } from '@core/infra/Controller'
import {
  clientError,
  fail,
  HttpResponse,
  notFound,
  ok,
} from '@core/infra/HttpResponse'
import { CreatePost } from './CreatePost'
import { InvalidPostContentLength } from './errors/InvalidPostContentLength'
import { InvalidPostUserNotFound } from './errors/InvalidPostUserNotFound'

type CreatePostControllerRequest = {
  user: { id: string }
  content: string
}

export class CreatePostController implements Controller {
  constructor(private createUser: CreatePost) {}

  async handle({
    user,
    content,
  }: CreatePostControllerRequest): Promise<HttpResponse> {
    const result = await this.createUser.execute({ authorId: user.id, content })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case InvalidPostContentLength:
          return clientError(error)
        case InvalidPostUserNotFound:
          return notFound(error)
        default:
          return fail(error)
      }
    } else {
      return ok(result.value)
    }
  }
}
