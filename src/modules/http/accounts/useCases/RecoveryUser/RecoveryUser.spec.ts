import { createUser } from '@utils/tests/UserFactory';
import { describe, it, expect, beforeEach } from 'vitest';
import { Token } from '../../domain/user/Token';
import { InMemoryTokensRepository } from '../../repositories/in-memory/InMemoryTokensRepository';
import { InMemoryUserRepository } from '../../repositories/in-memory/inMemoryUserRepository';
import { ITokensRepository } from '../../repositories/ITokensRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import { SendRecoveryEmail } from '../SendRecoveryEmail/SendRecoveryEmail';
import { RecoveryPassword } from './RecoveryPassword';

let tokenRepository: ITokensRepository;
let usersRepository: IUserRepository;
let recoveryPassword: RecoveryPassword;
let sendRecoveryEmail: SendRecoveryEmail;

describe('Recovery User Password', () => {
  beforeEach(async () => {
    tokenRepository = new InMemoryTokensRepository();
    usersRepository = new InMemoryUserRepository(null, null, tokenRepository);
    recoveryPassword = new RecoveryPassword(usersRepository, tokenRepository);
  });

  it('should be able to change user password', async () => {
    const user = createUser({ email: 'jhonzin@doe.com' });
    const token = Token.create({
      type: 'recovery',
      user_id: user.id,
      used: false,
    });

    user.addToken(token);

    await usersRepository.create(user);

    const result = await recoveryPassword.execute({
      id: token.id,
      password: '123456',
    });

    expect(result.isRight()).toBeTruthy();
  });

  it('should be not able to change user password with invalid token', async () => {
    const user = createUser({ email: 'jhonzin@doe.com' });
    await usersRepository.create(user);

    const result = await recoveryPassword.execute({
      id: '112333',
      password: '123456',
    });
    expect(result.isLeft()).toBeTruthy();
  });
});
