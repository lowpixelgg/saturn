import { PrismaPostsRepository } from '@modules/http/social/repositories/prisma/PrismaPostsRepository'
import { PrismaProfilesRepository } from '@modules/http/social/repositories/prisma/PrismaProfilesRepository'
import { TimelineSearchEngine } from '@modules/http/social/useCases/TimelineSearchEngine/TimelineSearchEngine'
import { TimelineSearchEngineController } from '@modules/http/social/useCases/TimelineSearchEngine/TimelineSearchEngineController'
import { Controller } from '@core/infra/Controller'

export function makeTimelineSearchEngineController(): Controller {
  const repository = new PrismaProfilesRepository()
  const repository2nd = new PrismaPostsRepository()
  const useCase = new TimelineSearchEngine(repository2nd, repository)
  const controller = new TimelineSearchEngineController(useCase)

  return controller
}
