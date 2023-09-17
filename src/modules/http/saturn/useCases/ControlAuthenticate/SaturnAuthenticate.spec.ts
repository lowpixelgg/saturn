import { describe, beforeEach, it, expect } from 'vitest';
import { createUser } from '@utils/tests/UserFactory';
import { InMemoryUserRepository } from '@modules/http/accounts/repositories/in-memory/inMemoryUserRepository';
import { SaturnAuthenticate } from './SaturnAuthenticate';
import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository';

let usersRepository: IUserRepository;
let saturnAuthenticate: SaturnAuthenticate;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    saturnAuthenticate = new SaturnAuthenticate(usersRepository);
  });

  it('should be able to authenticate', async () => {
    const user = createUser();

    usersRepository.create(user);

    const buffer =
      'Basic ' + new Buffer('jhon@doe.com:123456').toString('base64');

    const response = await saturnAuthenticate.execute({
      buffer,
    });

    expect(response.isRight).toBeTruthy();
  });
});
