import { Controller } from '@core/infra/Controller'
import { UpdateWhitelistStatus } from '@modules/http/saturn/useCases/Whitelist/UpdateWhitelistStatus'
import { PrismaWhitelistRepository } from '@modules/http/player/repositories/prisma/PrismaWhitelistRepository'
import { PrismaUserRepository } from '@modules/http/accounts/repositories/prisma/PrismaUserRepository'
import { PrismaAnswersRepository } from '@modules/http/player/repositories/prisma/PrismaAnswerRepository'
import { UpdateWhitelistController } from '@modules/http/saturn/useCases/Whitelist/UpdateWhitelistController'
import { UpdateWhitelistDelete } from '@modules/http/saturn/useCases/Whitelist/UpdateWhitelistDelete'
import { PrismaNotificationsRepository } from '@modules/http/accounts/repositories/prisma/PrismaNotificationsRepository'
import { PrismaConnectionsRepository } from '@modules/http/accounts/repositories/prisma/PrismaConnectionsRepository'

export function makeSaturnUpdateWhitelistStatusController(): Controller {
  const notificationRepo = new PrismaNotificationsRepository()
  const connectionsRepository = new PrismaConnectionsRepository()
  const answersRepository = new PrismaAnswersRepository()
  const whitelistRepository = new PrismaWhitelistRepository(answersRepository)
  const usersRepository = new PrismaUserRepository(notificationRepo)
  const useCase = new UpdateWhitelistStatus(
    whitelistRepository,
    connectionsRepository,
    usersRepository
  )
  const updateWhitelistDeleteUseCase = new UpdateWhitelistDelete(
    whitelistRepository
  )
  const controller = new UpdateWhitelistController(
    useCase,
    updateWhitelistDeleteUseCase
  )

  return controller
}
