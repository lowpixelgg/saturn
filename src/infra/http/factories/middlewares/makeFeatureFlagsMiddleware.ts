import { Middleware } from '@core/infra/Middleware';
import { EnsureFeatureFlagsMiddleware } from '@infra/http/middlewares/EnsureFeatureFlagsMiddleware';

export function makeFeatureFlagsMiddleware(flag: string): Middleware {
  const middleware = new EnsureFeatureFlagsMiddleware(flag);
  return middleware;
}
