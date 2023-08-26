import { Controller } from '@core/infra/Controller'
import {
  clientError,
  HttpResponse,
  notFound,
  ok,
} from '@core/infra/HttpResponse'
import { Exam } from '@prisma/client'
import { GetWhitelistNotFound } from './errors/GetWhitelistDetailsNotFound'
import { GetWhitelistDetails } from './GetWhitelistDetails'

type GetWhitelistDetailsControllerRequest = {
  id: string
}

export class GetWhitelistController implements Controller {
  constructor(private getWhitelistDetails: GetWhitelistDetails) {}

  async handle({
    id,
  }: GetWhitelistDetailsControllerRequest): Promise<HttpResponse> {
    const result = await this.getWhitelistDetails.execute({ id })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case GetWhitelistNotFound:
          return notFound(error)
        default:
          return clientError(error)
      }
    } else {
      const data = result.value
      const parsedExam = data.exam.currentItems.map((exam: Exam) => {
        return {
          _id: exam.id,
          question: exam.question,
          answer: exam.answer,
        }
      })

      return ok({
        id: data.id,
        username: data.user.username.value,
        staff_id: data.staff_id,
        userid: data.user.id,
        status: data.status,
        exam: parsedExam,
        count: data.count,
      })
    }
  }
}
