import express from 'express';
import { makeAuthenticationMiddleware } from '../factories/middlewares/makeAuthenticationMiddleware';
import { adaptMiddleware } from '@core/infra/adapters/ExpressMiddlewareAdapter';
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter';
import { makeGetUpdatesPerDate } from '../factories/controllers/game/makeGetUpdatesPerDate';
import { makeAttachmentsController } from '../factories/controllers/game/makeAttachmentsController';
import multer from 'multer';
import { makeDeleteAttachmentController } from '../factories/controllers/game/makeDeleteAttachmentController';

const Game = express.Router();

Game.use(adaptMiddleware(makeAuthenticationMiddleware()));

Game.get('/updates/after/:date', adaptRoute(makeGetUpdatesPerDate()));

const upload = multer();

Game.post(
  '/attachments',
  upload.single('file'),
  adaptRoute(makeAttachmentsController())
);

Game.delete('/attachments', adaptRoute(makeDeleteAttachmentController()));

export { Game };
