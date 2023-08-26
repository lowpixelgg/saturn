import { Follow } from '@modules/http/social/domain/profiles/Follow'
import { IFollowsRepository } from '@modules/http/social/repositories/IFollowsRepository'
import { IProfilesRepository } from '@modules/http/social/repositories/IProfilesRepository'
import { Either, left, right } from '@core/logic/Either'
import { SubscribeFollowerAlreadySubscribed } from './errors/SubscribeFollowerAlreadySubscribed'
import { SubscribeFollowerDoesNotExist } from './errors/SubscribeFollowerDoesNotExist'
import { SubscribeFollowerProfileDoesNotExist } from './errors/SubscribeFollowerProfileDoesNotExist'

type SubscribeFollowerRequest = {
  followers_id?: string
  following_id?: string
}

type SubscribeFollowerResponse = Either<
  | SubscribeFollowerDoesNotExist
  | SubscribeFollowerProfileDoesNotExist
  | SubscribeFollowerAlreadySubscribed,
  boolean
>

export class SubscribeFollower {
  constructor(
    private followersRepository: IFollowsRepository,
    private profilesRepository: IProfilesRepository
  ) { }

  async execute({
    followers_id,
    following_id,
  }: SubscribeFollowerRequest): Promise<SubscribeFollowerResponse> {
    if (followers_id === following_id) {
      return right(true)
    }

    const userExists = await this.profilesRepository.exists(following_id)
    const profileExists = await this.profilesRepository.exists(followers_id)

    if (!profileExists) {
      return left(new SubscribeFollowerDoesNotExist())
    }

    if (!userExists) {
      return left(new SubscribeFollowerProfileDoesNotExist())
    }

    const profile = await this.profilesRepository.findOne(followers_id)

    const alreadySubscribetToVisitor =
      await this.followersRepository.findByProfileParams({
        followers_id,
        following_id,
      })

    if (alreadySubscribetToVisitor) {
      return left(new SubscribeFollowerAlreadySubscribed())
    }

    const follow = Follow.create({
      followers_id,
      following_id,
    })

    profile.subscribeFollow(follow)
    await this.profilesRepository.save(profile)


    return right(true)
  }
}
