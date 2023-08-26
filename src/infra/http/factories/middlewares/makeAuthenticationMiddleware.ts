import { Middleware } from '@core/infra/Middleware'
import { EnsureAuthenticatedMiddleware } from '@infra/http/middlewares/EnsureAuthenticatedMiddleware'

export function makeAuthenticationMiddleware(): Middleware {
  const middleware = new EnsureAuthenticatedMiddleware()
  return middleware
}
