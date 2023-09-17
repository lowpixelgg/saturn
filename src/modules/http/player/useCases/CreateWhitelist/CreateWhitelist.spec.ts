import { InMemoryUserRepository } from '@modules/http/accounts/repositories/in-memory/inMemoryUserRepository';
import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository';
import { IAnswerRepository } from '@modules/http/player/repositories/IAnswerRepository';
import { InMemoryAnswersRepository } from '@modules/http/player/repositories/in-memory/InMemoryAnswerRepository';
import { InMemoryWhitelistRepository } from '@modules/http/player/repositories/in-memory/InMemoryWhitelistRepository';
import { IWhitelistRepository } from '@modules/http/player/repositories/IWhitelistRepository';
import { createUser } from '@utils/tests/UserFactory';
import { expect, describe, it, beforeEach } from 'vitest';

import { CreateWhitelist } from './CreateWhitelist';

let answersRepository: IAnswerRepository;
let whitelistRepository: IWhitelistRepository;
let createWhitelist: CreateWhitelist;
let usersRepository: IUserRepository;

describe('CreateWhitelist', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository();
    whitelistRepository = new InMemoryWhitelistRepository(answersRepository);
    usersRepository = new InMemoryUserRepository();
    createWhitelist = new CreateWhitelist(
      whitelistRepository,
      answersRepository,
      usersRepository
    );
  });

  it('should be able to create a whitelist', async () => {
    const user = createUser();

    usersRepository.create(user);

    const exam = [
      {
        id: 1,
        question: 'yeye',
        answer: 'Mc Caveirinha',
      },
    ];

    const result = await createWhitelist.execute({
      exam: exam,
      user: user,
    });

    expect(result.isRight()).toBeTruthy();
  });

  it('should be not able to create whitelist if already exists', async () => {
    const user = createUser();

    usersRepository.create(user);

    const exam = [
      {
        id: 1,
        question: 'yeye',
        answer: 'Mc Caveirinha',
      },
    ];

    const result = await createWhitelist.execute({
      exam: exam,
      user: user,
    });

    const result2 = await createWhitelist.execute({
      exam: exam,
      user: user,
    });

    expect(result.isRight()).toBeTruthy();
    expect(result2.isLeft()).toBeTruthy();
  });

  it('should be able to created whitelist before timeouted', async () => {
    const user = createUser({ status: 'REPROVADO', timeout: 2019122506 });

    usersRepository.create(user);

    const exam = [
      {
        id: 1,
        question: 'yeye',
        answer: 'Mc Caveirinha',
      },
    ];

    const result = await createWhitelist.execute({
      exam: exam,
      user: user,
    });

    if (result.isRight()) {
      result.value.setWhitelistStatus = 'REPROVADO';
      whitelistRepository.save(result.value);
    }

    const result2 = await createWhitelist.execute({
      exam: exam,
      user: user,
    });

    expect(result2.isLeft()).toBeTruthy();
  });
});
