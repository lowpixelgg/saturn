import { Controller } from '@core/infra/Controller'
import { SubscribeVisitor } from '@modules/http/social/useCases/SubscribeVisitor/SubscribeVisitor'
import { SubscribeVisitorController } from '@modules/http/social/useCases/SubscribeVisitor/SubscribeVisitorController'
import { PrismaVisitorsRepository } from '@modules/http/social/repositories/prisma/PrismaVisitorsRepository'
import { PrismaProfilesRepository } from '@modules/http/social/repositories/prisma/PrismaProfilesRepository'

export function makeSubscribeVisitorController(): Controller {
  const repository2nd = new PrismaVisitorsRepository()
  const repository1nd = new PrismaProfilesRepository(repository2nd)
  const useCase = new SubscribeVisitor(repository1nd, repository2nd)
  const controller = new SubscribeVisitorController(useCase)

  return controller
}
