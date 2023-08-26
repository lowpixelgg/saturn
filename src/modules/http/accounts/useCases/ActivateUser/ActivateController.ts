import { Controller } from '@core/infra/Controller'
import {
  HttpResponse,
  ok,
  fail,
  notFound,
  clientError,
  forbidden,
} from '@core/infra/HttpResponse'
import { ActivateUser } from './ActivateUser'
import { ServiceTokenNotFound } from './errors/ServiceTokenNotFound'
import { ServiceTokenExpired } from './errors/ServiceTokenExpired'
import { ServiceTokenAlreadyUsed } from './errors/ServiceTokenAlreadyUsed'
import { ServiceTokenNotValid } from './errors/ServiceTokenNotValid'

type ActivationRequest = {
  id: string
}

export class ActivateController implements Controller {
  constructor(private activateUser: ActivateUser) {}

  async handle({ id }: ActivationRequest): Promise<HttpResponse> {
    try {
      const result = await this.activateUser.execute({
        id,
      })

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case ServiceTokenAlreadyUsed:
            return clientError(error)
          case ServiceTokenNotFound:
            return notFound(error)
          case ServiceTokenExpired:
            return clientError(error)
          case ServiceTokenNotValid:
            return clientError(error)
          default:
            return fail(error)
        }
      } else {
        return ok(result.value)
      }
    } catch (err) {
      return fail(err)
    }
  }
}
