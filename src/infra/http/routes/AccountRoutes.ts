import express from 'express';
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter';
import { adaptMiddleware } from '../../../core/infra/adapters/ExpressMiddlewareAdapter';

// Factories
import { makeRegisterController } from '../factories/controllers/AccountsFactory/makeRegisterController';
import { makeAuthenticateController } from '../factories/controllers/AccountsFactory/makeAuthenticateController';
import { makeAuthenticationMiddleware } from '../factories/middlewares/makeAuthenticationMiddleware';
import { makeFeatureFlagsMiddleware } from '../factories/middlewares/makeFeatureFlagsMiddleware';
import { makeActivateUserController } from '../factories/controllers/AccountsFactory/makeActivateUserController';
import { makeSendRecoveryEmailController } from '../factories/controllers/AccountsFactory/makeSendRecoveryEmailController';
import { makeRecoveryPasswordController } from '../factories/controllers/AccountsFactory/makeRecoveryPasswordController';
import { makeGetAccountDataController } from '../factories/controllers/AccountsFactory/makeGetAccountDataController';
import { makeAnonymousUserMiddleware } from '../factories/middlewares/makeAnonymousUserMiddleware';
import { makeNotificationController } from '../factories/controllers/AccountsFactory/makeNotificationController';
import { makeSocialGoogleAuthenticateController } from '../factories/controllers/AccountsFactory/makeSocialGoogleAuthenticateController';
import { makeDiscordConnectionController } from '../factories/controllers/AccountsFactory/Connections/makeDiscordConnectionController';
import { makeRateLimitMiddleware } from '../factories/middlewares/makeRateLimitMiddleware';

const Account = express.Router();

Account.get(
  '/authenticate',
  adaptMiddleware(makeAnonymousUserMiddleware()),
  adaptMiddleware(makeFeatureFlagsMiddleware('create:session')),
  adaptRoute(makeAuthenticateController())
);

Account.post(
  '/authenticate/social/google',
  adaptMiddleware(makeAnonymousUserMiddleware()),
  adaptRoute(makeSocialGoogleAuthenticateController())
);

Account.post('/register', adaptRoute(makeRegisterController()));

Account.patch(
  '/activate/:id',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 5 * 60 * 1000,
      max: 1,
    })
  ),
  adaptMiddleware(makeAnonymousUserMiddleware()),
  adaptMiddleware(makeFeatureFlagsMiddleware('read:activation_token')),
  adaptRoute(makeActivateUserController())
);

Account.get(
  '/recovery/send/:email',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 15 * 60 * 1000,
      max: 1,
    })
  ),
  adaptMiddleware(makeAnonymousUserMiddleware()),
  adaptRoute(makeSendRecoveryEmailController())
);

Account.post(
  '/recovery/change/:id',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 10 * 60 * 1000,
      max: 1,
    })
  ),
  adaptMiddleware(makeAnonymousUserMiddleware()),
  adaptRoute(makeRecoveryPasswordController())
);

Account.get(
  '/',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeFeatureFlagsMiddleware('read:user:self')),
  adaptRoute(makeGetAccountDataController())
);

Account.patch(
  '/notification/read',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 5 * 60 * 1000,
      max: 5,
    })
  ),
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeFeatureFlagsMiddleware('update:profile:self')),
  adaptRoute(makeNotificationController())
);

Account.post(
  '/connections/discord/:code',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 10 * 60 * 1000,
      max: 1,
    })
  ),
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeDiscordConnectionController())
);

export { Account };
