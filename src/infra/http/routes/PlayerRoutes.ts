import express from 'express';
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter';
import { adaptMiddleware } from '../../../core/infra/adapters/ExpressMiddlewareAdapter';
import { makeAuthenticationMiddleware } from '../factories/middlewares/makeAuthenticationMiddleware';
import { makeFeatureFlagsMiddleware } from '../factories/middlewares/makeFeatureFlagsMiddleware';
import { makeCreateWhitelistController } from '../factories/controllers/player/makeCreateWhitelistController';
import { makeCreateAppointmentController } from '../factories/controllers/player/makeCreateAppointmentController';
import { makeRateLimitMiddleware } from '../factories/middlewares/makeRateLimitMiddleware';

const Player = express.Router();

Player.use(adaptMiddleware(makeAuthenticationMiddleware()));

Player.post(
  '/exams/create-whitelist',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 15 * 60 * 1000,
      max: 1,
    })
  ),
  adaptMiddleware(makeFeatureFlagsMiddleware('create:whitelist')),
  adaptRoute(makeCreateWhitelistController())
);

Player.post(
  '/exams/create-appointment',
  adaptMiddleware(
    makeRateLimitMiddleware({
      windowMs: 15 * 60 * 1000,
      max: 1,
    })
  ),
  adaptMiddleware(makeFeatureFlagsMiddleware('create:whitelist')),
  adaptRoute(makeCreateAppointmentController())
);

export { Player };
