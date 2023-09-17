import { Either, left, right } from '@core/logic/Either';
import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository';

import { RecoveryAlreadyUsed } from '@modules/http/accounts/useCases/RecoveryUser/error/RecoveryAlreadyUsed';
import { RecoveryExpired } from '@modules/http/accounts/useCases/RecoveryUser/error/RecoveryExpired';
import { RecoveryNotFound } from '@modules/http/accounts/useCases/RecoveryUser/error/RecoveryNotFound';
import { Password } from '@modules/http/accounts/domain/user/Password';
import dayjs from 'dayjs';
import { Token } from '../../domain/user/Token';
import { ITokensRepository } from '../../repositories/ITokensRepository';
import { RecoveryTokenNotValid } from './error/RecoveryTokenNotValid';

type RecoveryPasswordRequest = {
  id: string;
  password: string;
};

type RecoveryPasswordResponse = Either<
  | RecoveryAlreadyUsed
  | RecoveryExpired
  | RecoveryNotFound
  | RecoveryTokenNotValid,
  Token
>;

export class RecoveryPassword {
  constructor(
    private usersRepository: IUserRepository,
    private tokensRepository: ITokensRepository
  ) {}

  async execute({
    id,
    password,
  }: RecoveryPasswordRequest): Promise<RecoveryPasswordResponse> {
    const token = await this.tokensRepository.getById(id);

    if (!token) {
      return left(new RecoveryNotFound());
    }

    if (token.type !== 'recovery') {
      return left(new RecoveryTokenNotValid());
    }

    if (token.used) {
      return left(new RecoveryAlreadyUsed());
    }

    if (dayjs().isAfter(dayjs.unix(token.expiresIn))) {
      return left(new RecoveryExpired());
    }

    const account = await this.usersRepository.findOne(token.userId);
    const passwordOrError = Password.create(password);

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    // Update and save new user password.
    account.setPassword = passwordOrError.value;

    // mark the request token to used
    token.markHasUsed = true;

    await this.tokensRepository.saveSingle(token);
    await this.usersRepository.save(account);

    return right(token);
  }
}
