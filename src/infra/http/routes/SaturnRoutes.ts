import express from 'express'
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter'
import { adaptMiddleware } from '../../../core/infra/adapters/ExpressMiddlewareAdapter'
import { makeAuthenticationMiddleware } from '../factories/middlewares/makeAuthenticationMiddleware'
import { makeFeatureFlagsMiddleware } from '../factories/middlewares/makeFeatureFlagsMiddleware'
import { makeSaturnAuthenticationController } from '../factories/controllers/saturn/makeSaturnAuthenticationController'
import { makeAnonymousUserMiddleware } from '../factories/middlewares/makeAnonymousUserMiddleware'
import { makeSaturnSearchWhitelistController } from '../factories/controllers/saturn/makeSaturnSearchWhitelistController'
import { makeSaturnGetWhitelistDetailsController } from '../factories/controllers/saturn/makeSaturnGetWhitelistDetailsController'
import { makeSaturnUpdateWhitelistStatusController } from '../factories/controllers/saturn/makeSaturnUpdateWhitelistStatusController'
import { makeSaturnCreateWeekTimesController } from '../factories/controllers/saturn/makeSaturnCreateWeekTimesController'
import { makeSaturnGetWeekTimes } from '../factories/controllers/saturn/makeSaturnGetWeekTimes'
import { makeChangeAppointmentStatusController } from '../factories/controllers/player/makeChangeAppointmentStatusController'
import { makeGetStaffAppointmentsController } from '../factories/controllers/saturn/makeGetStaffAppointmentsController'
import { makeChangeStaffInterviewController } from '../factories/controllers/saturn/makeChangeStaffInterviewController'

const Saturn = express.Router()

Saturn.get(
  '/authenticate',
  adaptMiddleware(makeAnonymousUserMiddleware()),
  adaptMiddleware(makeFeatureFlagsMiddleware('create:session')),
  adaptRoute(makeSaturnAuthenticationController())
)

Saturn.get(
  '/player/whitelist/search',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeFeatureFlagsMiddleware('read:whitelist:list')),
  adaptRoute(makeSaturnSearchWhitelistController())
)

Saturn.get(
  '/player/whitelist/:id',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeFeatureFlagsMiddleware('read:whitelist')),
  adaptRoute(makeSaturnGetWhitelistDetailsController())
)

Saturn.post(
  '/staff/appointment/week-times',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeFeatureFlagsMiddleware('update:week-times')),
  adaptRoute(makeSaturnCreateWeekTimesController())
)

Saturn.patch(
  '/player/whitelist/update',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeFeatureFlagsMiddleware('update:whitelist')),
  adaptRoute(makeSaturnUpdateWhitelistStatusController())
)

Saturn.get('/appointment/week-times', adaptRoute(makeSaturnGetWeekTimes()))

Saturn.post(
  '/player/appointment/change-status',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeChangeAppointmentStatusController())
)

Saturn.get(
  '/player/appointments/search',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptMiddleware(makeFeatureFlagsMiddleware('read:whitelist:list')),
  adaptRoute(makeGetStaffAppointmentsController())
)

Saturn.put(
  '/player/appointments/:appointmentId/:tokenId',
  adaptMiddleware(makeAuthenticationMiddleware()),
  adaptRoute(makeChangeStaffInterviewController())
)

export { Saturn }
