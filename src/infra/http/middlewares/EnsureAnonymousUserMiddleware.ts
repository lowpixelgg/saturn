import { createAnonymous } from '@utils/tests/UserFactory'
import { HttpResponse, ok } from '@core/infra/HttpResponse'
import { Middleware } from '@core/infra/Middleware'

export class EnsureAnonymousUserMiddleware implements Middleware {
  constructor() {}

  async handle(): Promise<HttpResponse> {
    const anonymousAccount = createAnonymous({
      features: ['read:activation_token', 'create:session'],
    }).value

    return ok({ user: anonymousAccount })
  }
}
