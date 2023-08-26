import { Middleware } from '@core/infra/Middleware'
import { EnsureAnonymousUserMiddleware } from '@infra/http/middlewares/EnsureAnonymousUserMiddleware'

export function makeAnonymousUserMiddleware(): Middleware {
  const middleware = new EnsureAnonymousUserMiddleware()
  return middleware
}
