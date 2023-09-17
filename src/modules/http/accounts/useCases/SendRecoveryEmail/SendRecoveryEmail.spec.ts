import { createUser } from '@utils/tests/UserFactory';
import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryUserRepository } from '../../repositories/in-memory/inMemoryUserRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import { SendRecoveryEmail } from './SendRecoveryEmail';

let usersRepository: IUserRepository;
let sendRecoveryEmail: SendRecoveryEmail;

describe('Send Recovery Email Model', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sendRecoveryEmail = new SendRecoveryEmail(usersRepository);
  });

  it('should be able to send recovery email', async () => {
    const user = createUser({ email: 'jhonzin@doe.com' });
    await usersRepository.create(user);
    const result = await sendRecoveryEmail.execute({ email: user.email.value });
    expect(result.isRight()).toBeTruthy();
  });

  it('not should be able to send recovery email with not-found email', async () => {
    const result = await sendRecoveryEmail.execute({
      email: 'rerus@lopez.dev',
    });
    expect(result.isLeft()).toBeTruthy();
  });
});
