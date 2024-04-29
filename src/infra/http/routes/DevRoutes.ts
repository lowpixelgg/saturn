import express from 'express';
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter';
import { adaptMiddleware } from '../../../core/infra/adapters/ExpressMiddlewareAdapter';
import { makeAuthenticationMiddleware } from '../factories/middlewares/makeAuthenticationMiddleware';
import { makeFeatureFlagsMiddleware } from '../factories/middlewares/makeFeatureFlagsMiddleware';
import { makeCreateWhitelistController } from '../factories/controllers/player/makeCreateWhitelistController';
import { makeCreateAppointmentController } from '../factories/controllers/player/makeCreateAppointmentController';
import { makeRateLimitMiddleware } from '../factories/middlewares/makeRateLimitMiddleware';
import { makeCreateController } from '../factories/controllers/dev/makeCreateController';

const Dev = express.Router();

Dev.get(
  '/dev/create',
  adaptRoute(makeCreateController())
);

export { Dev };
