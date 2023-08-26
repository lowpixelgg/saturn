import { PrismaFollowsRepository } from '@modules/http/social/repositories/prisma/PrismaFollowsRepository'
import { PrismaProfilesRepository } from '@modules/http/social/repositories/prisma/PrismaProfilesRepository'
import { SubscribeFollower } from '@modules/http/social/useCases/SubscribeFollower/SubscribeFollower'
import { SubscribeFollowerController } from '@modules/http/social/useCases/SubscribeFollower/SubscribeFollowerController'
import { SubscribeFollowerFindAll } from '@modules/http/social/useCases/SubscribeFollower/SubscribeFollowerFindAll'
import { SubscribeFollowerUnsubscribe } from '@modules/http/social/useCases/SubscribeFollower/SubscribeFollowUnFollow'

import { Controller } from '@core/infra/Controller'

export function makeSubscribeFollowerController(): Controller {
  const followersRepository = new PrismaFollowsRepository()
  const profileRepository = new PrismaProfilesRepository(
    null,
    followersRepository
  )

  const useCase = new SubscribeFollower(followersRepository, profileRepository)
  const useCaseFindAll = new SubscribeFollowerFindAll(
    followersRepository,
    profileRepository
  )

  const useCaseUnfollow = new SubscribeFollowerUnsubscribe(
    followersRepository,
    profileRepository
  )

  const controller = new SubscribeFollowerController(
    useCase,
    useCaseFindAll,
    useCaseUnfollow
  )

  return controller
}
