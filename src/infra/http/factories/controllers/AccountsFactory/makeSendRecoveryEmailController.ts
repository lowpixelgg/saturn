import { PrismaUserRepository } from '@modules/http/accounts/repositories/prisma/PrismaUserRepository'
import { Controller } from '@core/infra/Controller'
import { SendRecoveryEmail } from '@modules/http/accounts/useCases/SendRecoveryEmail/SendRecoveryEmail'
import { SendRecoveryEmailController } from '@modules/http/accounts/useCases/SendRecoveryEmail/SendRecoveryEmailController'
import { PrismaTokensRepository } from '@modules/http/accounts/repositories/prisma/PrismaTokensRepository'

export function makeSendRecoveryEmailController(): Controller {
  const tokensRepository = new PrismaTokensRepository()
  const repository = new PrismaUserRepository(null, null, tokensRepository)
  const useCase = new SendRecoveryEmail(repository)
  const controller = new SendRecoveryEmailController(useCase)

  return controller
}
