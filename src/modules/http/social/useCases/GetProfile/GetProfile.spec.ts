import { InMemoryUserRepository } from '@modules/http/accounts/repositories/in-memory/inMemoryUserRepository';
import { InMemoryProfilesRepository } from '@modules/http/social/repositories/in-memory/InMemoryProfilesRepository';
import { IProfilesRepository } from '@modules/http/social/repositories/IProfilesRepository';
import { createUser } from '@utils/tests/UserFactory';
import { expect, describe, it, beforeEach } from 'vitest';

import { GetProfile } from './GetProfile';

let profilesRespository: IProfilesRepository;
let getProfile: GetProfile;
let usersRepository: InMemoryUserRepository;

describe('GetProfile', () => {
  beforeEach(() => {
    profilesRespository = new InMemoryProfilesRepository();
    getProfile = new GetProfile(profilesRespository);
    usersRepository = new InMemoryUserRepository();
  });

  it('should be able to get profile', async () => {
    const user = {
      id: '12345',
    };

    const result = await getProfile.execute({ ident: 'jhondoe', user });

    expect(result.isRight()).toBeTruthy();
  });

  it('not should be able to get profile', async () => {
    const user = createUser();

    const result = await getProfile.execute({ ident: 'jhondoe1', user });

    expect(result.isLeft()).toBeTruthy();
  });
});
