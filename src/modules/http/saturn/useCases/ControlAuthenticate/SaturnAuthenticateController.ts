import { Controller } from '@core/infra/Controller'
import { PermissionDenied } from '@infra/http/errors/PermissionDenied'
import {
  HttpResponse,
  ok,
  fail,
  notFound,
  clientError,
  forbidden,
  unauthorized,
} from '@core/infra/HttpResponse'

import { SaturnAuthenticate } from './SaturnAuthenticate'
import { AccountDoesNotExist } from './errors/AccountDoesNotExist'
import { AccountInvalidPassword } from './errors/AccountInvalidPassword'
import { AccountDoesNotHavePermission } from './errors/AccountDoesNotHavePermission'

type SaturnAuthenticateRequest = {
  authorization: string
}

export class AuthenticateUserController implements Controller {
  constructor(private saturnAuthenticate: SaturnAuthenticate) {}

  async handle({
    authorization,
  }: SaturnAuthenticateRequest): Promise<HttpResponse> {
    try {
      // TODO: Add validation
      const result = await this.saturnAuthenticate.execute({
        buffer: authorization,
      })

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case AccountInvalidPassword:
            return unauthorized(error)
          case AccountDoesNotExist:
            return notFound(error)
          case PermissionDenied:
            return forbidden(error)
          case AccountDoesNotHavePermission:
            return forbidden(error)
          default:
            return clientError(error)
        }
      } else {
        const { token } = result.value

        return ok({
          token,
        })
      }
    } catch (err) {
      return fail(err)
    }
  }
}
