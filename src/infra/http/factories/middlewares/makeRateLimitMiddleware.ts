import { Middleware } from '@core/infra/Middleware';
import { EnsureFeatureFlagsMiddleware } from '@infra/http/middlewares/EnsureFeatureFlagsMiddleware';
import { EnsureRateLimitMiddleware } from '@infra/http/middlewares/EnsureRateLimitMiddleware';
import { Options } from '../../middlewares/EnsureRateLimitMiddleware';

export function makeRateLimitMiddleware(options: Options): Middleware {
  const middleware = new EnsureRateLimitMiddleware(options);
  return middleware;
}
