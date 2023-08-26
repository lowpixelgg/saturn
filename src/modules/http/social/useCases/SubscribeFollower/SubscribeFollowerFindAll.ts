import { Follow } from '@modules/http/social/domain/profiles/Follow'
import { IFollowsRepository } from '@modules/http/social/repositories/IFollowsRepository'
import { IProfilesRepository } from '@modules/http/social/repositories/IProfilesRepository'
import { Either, left, right } from '@core/logic/Either'
import { SubscribeFollowerProfileDoesNotExist } from './errors/SubscribeFollowerProfileDoesNotExist'

type SubscribeFollowerFindAllRequest = {
  followers_id: string
}

type SubscribeFollowersFindAllResponse = Either<
  SubscribeFollowerProfileDoesNotExist,
  Follow[]
>

export class SubscribeFollowerFindAll {
  constructor(
    private followersRepository: IFollowsRepository,
    private profilesRepository: IProfilesRepository
  ) {}

  async execute({
    followers_id,
  }: SubscribeFollowerFindAllRequest): Promise<SubscribeFollowersFindAllResponse> {
    const exists = await this.profilesRepository.exists(followers_id)

    if (!exists) {
      return left(new SubscribeFollowerProfileDoesNotExist())
    }

    const followers = await this.followersRepository.findAllByProfileParams({
      followers_id,
    })

    return right(followers)
  }
}
