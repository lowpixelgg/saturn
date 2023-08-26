import { PrismaWhitelistRepository } from '@modules/http/player/repositories/prisma/PrismaWhitelistRepository'
import { Controller } from '@core/infra/Controller'
import { GetWhitelistDetails } from '@modules/http/saturn/useCases/GetWhitelistDetails/GetWhitelistDetails'
import { GetWhitelistController } from '@modules/http/saturn/useCases/GetWhitelistDetails/GetWhitelistDetailsController'

export function makeSaturnGetWhitelistDetailsController(): Controller {
  const repository = new PrismaWhitelistRepository()
  const useCase = new GetWhitelistDetails(repository)
  const controller = new GetWhitelistController(useCase)

  return controller
}
