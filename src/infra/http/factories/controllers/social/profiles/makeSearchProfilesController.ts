import { Controller } from '@core/infra/Controller'
import { SearchProfiles } from '@modules/http/social/useCases/SearchProfiles/SearchProfiles'
import { SearchProfilesController } from '@modules/http/social/useCases/SearchProfiles/SearchProfilesController'
import { PrismaProfilesRepository } from '@modules/http/social/repositories/prisma/PrismaProfilesRepository'

export function makeSearchProfilesController(): Controller {
  const repository = new PrismaProfilesRepository()
  const useCase = new SearchProfiles(repository)
  const controller = new SearchProfilesController(useCase)

  return controller
}
