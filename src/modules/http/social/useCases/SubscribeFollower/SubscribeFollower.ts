import { Follow } from '@modules/http/social/domain/profiles/Follow';
import { IFollowsRepository } from '@modules/http/social/repositories/IFollowsRepository';
import { IProfilesRepository } from '@modules/http/social/repositories/IProfilesRepository';
import { Either, left, right } from '@core/logic/Either';
import { SubscribeFollowerAlreadySubscribed } from './errors/SubscribeFollowerAlreadySubscribed';
import { SubscribeFollowerDoesNotExist } from './errors/SubscribeFollowerDoesNotExist';
import { SubscribeFollowerProfileDoesNotExist } from './errors/SubscribeFollowerProfileDoesNotExist';

type SubscribeFollowerRequest = {
  followers_id?: string;
  user: { id: string };
};

type SubscribeFollowerResponse = Either<
  | SubscribeFollowerDoesNotExist
  | SubscribeFollowerProfileDoesNotExist
  | SubscribeFollowerAlreadySubscribed,
  boolean
>;

export class SubscribeFollower {
  constructor(
    private followersRepository: IFollowsRepository,
    private profilesRepository: IProfilesRepository
  ) {}

  async execute({
    followers_id,
    user,
  }: SubscribeFollowerRequest): Promise<SubscribeFollowerResponse> {
    if (followers_id === user.id) {
      return right(true);
    }

    const profileExists = await this.profilesRepository.exists(followers_id);

    if (!profileExists) {
      return left(new SubscribeFollowerDoesNotExist());
    }

    const profile = await this.profilesRepository.findOne(followers_id);

    const alreadySubscribetToVisitor =
      await this.followersRepository.findByProfileParams({
        followers_id,
        following_id: user.id,
      });

    if (alreadySubscribetToVisitor) {
      return left(new SubscribeFollowerAlreadySubscribed());
    }

    const follow = Follow.create({
      followers_id,
      following_id: user.id,
    });

    profile.subscribeFollow(follow);
    await this.profilesRepository.save(profile);

    return right(true);
  }
}
