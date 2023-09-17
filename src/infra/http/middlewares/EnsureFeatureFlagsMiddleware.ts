import { Middleware } from '@core/infra/Middleware';
import { forbidden, notFound, ok } from '@core/infra/HttpResponse';
import { RequisitedFlagNotExists } from '../errors/RequesitedFlagNotExist';
import { PermissionDenied } from '../errors/PermissionDenied';
import { FeatureFlags } from '@modules/http/accounts/domain/user/features';

export class EnsureFeatureFlagsMiddleware implements Middleware {
  readonly feature: string;

  constructor(feature: string) {
    this.feature = feature;
  }

  async handle({ user }) {
    if (!FeatureFlags.has(this.feature)) {
      return notFound(new RequisitedFlagNotExists(this.feature));
    }

    if (!FeatureFlags.can(user.features, this.feature)) {
      return forbidden(new PermissionDenied(this.feature));
    }

    return ok();
  }
}
