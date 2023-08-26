import { PrismaWhitelistRepository } from '@modules/http/player/repositories/prisma/PrismaWhitelistRepository'
import { Controller } from '@core/infra/Controller'
import { CreateWhitelist } from '@modules/http/player/useCases/CreateWhitelist/CreateWhitelist'
import { PrismaAnswersRepository } from '@modules/http/player/repositories/prisma/PrismaAnswerRepository'
import { CreateWhitelistController } from '@modules/http/player/useCases/CreateWhitelist/CreateWhitelistController'
import { PrismaUserRepository } from '@modules/http/accounts/repositories/prisma/PrismaUserRepository'

export function makeCreateWhitelistController(): Controller {
  const repository1nd = new PrismaAnswersRepository()
  const usersRepository = new PrismaUserRepository()
  const repository = new PrismaWhitelistRepository(repository1nd)
  const useCase = new CreateWhitelist(
    repository,
    repository1nd,
    usersRepository
  )
  const controller = new CreateWhitelistController(useCase)

  return controller
}
