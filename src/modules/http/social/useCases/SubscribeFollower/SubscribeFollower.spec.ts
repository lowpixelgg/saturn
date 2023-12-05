import { IFollowsRepository } from '@modules/http/social/repositories/IFollowsRepository';
import { InMemoryProfileFollowsRepository } from '@modules/http/social/repositories/in-memory/InMemoryProfileFollowsRepository';
import { InMemoryProfilesRepository } from '@modules/http/social/repositories/in-memory/InMemoryProfilesRepository';
import { IProfilesRepository } from '@modules/http/social/repositories/IProfilesRepository';
import { beforeEach, describe, expect, it } from 'vitest';
import { SubscribeFollower } from './SubscribeFollower';

let followersRepository: IFollowsRepository;
let profilesRespository: IProfilesRepository;
let subscribeFollower: SubscribeFollower;

describe('Subscribe Follower', () => {
  beforeEach(() => {
    followersRepository = new InMemoryProfileFollowsRepository();
    profilesRespository = new InMemoryProfilesRepository(
      null,
      followersRepository
    );
    subscribeFollower = new SubscribeFollower(
      followersRepository,
      profilesRespository
    );
  });

  it('should be able to follow new user', async () => {
    const result = await subscribeFollower.execute({
      followers_id: '12345',
      user: { id: '123456' },
    });

    expect(result.isRight()).toBeTruthy();
  });

  it('not should be able to assign follow to profile', async () => {
    const result = await subscribeFollower.execute({
      followers_id: '77777',
      user: { id: '1234561' },
    });

    expect(result.isLeft()).toBeTruthy();
  });
});
