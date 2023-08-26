import { decode, JwtPayload } from 'jsonwebtoken'
import { JWT } from '@modules/http/accounts/domain/user/jwt'

import {
  fail,
  forbidden,
  HttpResponse,
  ok,
  unauthorized,
} from '@core/infra/HttpResponse'
import { Middleware } from '@core/infra/Middleware'

import { AccessDenied } from '@infra/http/errors/AccessDenied'
import { User } from '@modules/http/accounts/domain/user/user'
import { createAnonymous } from '@utils/tests/UserFactory'
import { UserMapper } from '@modules/http/accounts/mappers/UserMapper'

type EnsureAuthenticatedMiddlewareRequest = {
  accessToken: string
}

export class EnsureAuthenticatedMiddleware implements Middleware {
  constructor() {}

  async handle(
    request: EnsureAuthenticatedMiddlewareRequest
  ): Promise<HttpResponse> {
    try {
      const { accessToken } = request

      if (accessToken && accessToken.length > 1000) {
        return unauthorized(new AccessDenied())
      }

      if (accessToken) {
        try {
          const decoded = JWT.decodeToken(accessToken)
          const user = decoded.value as unknown as User

          if (decoded.isLeft()) {
            return unauthorized(new AccessDenied())
          }

          return ok({ user: user })
        } catch (err) {
          return unauthorized(new AccessDenied())
        }
      } else {
        return unauthorized(new AccessDenied())
      }
    } catch (error) {
      return fail(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
