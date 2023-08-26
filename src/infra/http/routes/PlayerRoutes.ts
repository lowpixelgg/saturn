import express from 'express'
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'
import { adaptMiddleware } from '../../../core/infra/adapters/ExpressMiddlewareAdapter'
import { makeAuthenticationMiddleware } from '../factories/middlewares/makeAuthenticationMiddleware'
import { makeFeatureFlagsMiddleware } from '../factories/middlewares/makeFeatureFlagsMiddleware'
import { makeCreateWhitelistController } from '../factories/controllers/player/makeCreateWhitelistController'
import { makeCreateAppointmentController } from '../factories/controllers/player/makeCreateAppointmentController'

const Player = express.Router()

Player.use(adaptMiddleware(makeAuthenticationMiddleware()))

Player.post(
  '/exams/create-whitelist',
  adaptMiddleware(makeFeatureFlagsMiddleware('create:whitelist')),
  adaptRoute(makeCreateWhitelistController())
)

Player.post(
  '/exams/create-appointment',
  adaptMiddleware(makeFeatureFlagsMiddleware('create:whitelist')),
  adaptRoute(makeCreateAppointmentController())
)

export { Player }
