import express from 'express';
import { makeAuthenticationMiddleware } from '../factories/middlewares/makeAuthenticationMiddleware';
import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter';
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter';
import { makeGetUpdatesPerDate } from '../factories/controllers/launcher/makeGetUpdatesPerDate';

const Launcher = express.Router();

Launcher.use(adaptMiddleware(makeAuthenticationMiddleware()));

Launcher.get('/updates/after/:date', adaptRoute(makeGetUpdatesPerDate()));

export { Launcher };
