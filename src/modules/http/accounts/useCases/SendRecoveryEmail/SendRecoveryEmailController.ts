import { Controller } from '@core/infra/Controller'
import { fail, HttpResponse, notFound, ok } from '@core/infra/HttpResponse'
import { SendRecoveryEmail } from './SendRecoveryEmail'
import { SendRecoveryUserNotFound } from './errors/SendRecoveryUserNotFound'

type SendRecoveryEmailRequest = {
  email: string
}

export class SendRecoveryEmailController implements Controller {
  constructor(private sendRecoveryEmail: SendRecoveryEmail) {}

  async handle({ email }: SendRecoveryEmailRequest): Promise<HttpResponse> {
    const result = await this.sendRecoveryEmail.execute({ email })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case SendRecoveryUserNotFound:
          return notFound(error)
        default:
          return fail(error)
      }
    }

    return ok()
  }
}
