import { Controller } from '@core/infra/Controller'
import { PrismaTimesRepository } from '@modules/http/saturn/repositories/prisma/PrismaTimesRepository'
import { GetWeekTimes } from '@modules/http/saturn/useCases/GetWeekTimes/GetWeekTimes'
import { GetWeekTimesController } from '@modules/http/saturn/useCases/GetWeekTimes/GetWeekTimesController'

export function makeSaturnGetWeekTimes(): Controller {
  const repository = new PrismaTimesRepository()
  const useCase = new GetWeekTimes(repository)
  const controller = new GetWeekTimesController(useCase)

  return controller
}
