import { Either, left, right } from '@core/logic/Either';
import { JWT } from '../../domain/user/jwt';
import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository';
import { AccountInvalidPassword } from './errors/AccountInvalidPassword';
import { AccountDoesNotExist } from './errors/AccountDoesNotExist';
import { UserMapper } from '@modules/http/accounts/mappers/UserMapper';
import { FeatureFlags } from '@modules/http/accounts/domain/user/features';
import { PermissionDenied } from '@infra/http/errors/PermissionDenied';
import { User } from '@modules/http/accounts/domain/user/user';
import Queue from '@infra/libs/Queue/bull';
import { ITokensRepository } from '../../repositories/ITokensRepository';
import { Token } from '../../domain/user/Token';

type TokenResponse = {
  token: string;
};

type AuthenticateUserRequest = {
  buffer: string;
};

type AuthenticateUserResponse = Either<
  AccountInvalidPassword | PermissionDenied | AccountInvalidPassword,
  TokenResponse
>;

export class AuthenticateUser {
  constructor(private usersRepository: IUserRepository) {}

  async execute({
    buffer,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const [, hash] = buffer.split(' ');
    const [email, password] = Buffer.from(hash, 'base64').toString().split(':');
    const account = await this.usersRepository.findOne(email);

    if (!account) {
      return left(new AccountDoesNotExist());
    }

    const isPasswordValid = await account.password.comparePassword(password);

    if (isPasswordValid === false) {
      return left(new AccountInvalidPassword());
    }

    if (
      !FeatureFlags.can(account.features, 'create:session') &&
      FeatureFlags.can(account.features, 'read:activation_token')
    ) {
      // Here is called the email sending service,
      // where the email will be sent to the user to confirm.

      const tokenObject = Token.create({
        type: 'activation',
        user_id: account.id,
        used: false,
      });

      await this.usersRepository.save(account);

      // Sending the Activation-mail to user.
      await Queue.add('RegistrationMail', {
        name: account.username.value,
        email: account.email.value,
        activation_token: tokenObject.id,
      });

      return left(new PermissionDenied('create:session'));
    }

    const { token } = JWT.signUser(account);

    return right({
      token,
    });
  }
}
