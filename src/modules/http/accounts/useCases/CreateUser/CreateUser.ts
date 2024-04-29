import { Either, left, right } from '@core/logic/Either';
import { Email } from '@modules/http/accounts/domain/user/Email';
import { Password } from '@modules/http/accounts/domain/user/Password';
import { Name } from '@modules/http/accounts/domain/user/Username';
import { AccountAleardyExists } from '@modules/http/accounts/useCases/RegisterUser/errors/AccountAleardyExists';
import { InvalidPasswordError } from '@modules/http/accounts/domain/user/errors/InvalidPasswordError';
import { InvalidNameError } from '@modules/http/accounts/domain/user/errors/InvalidNameError';
import { InvalidEmailError } from '@modules/http/accounts/domain/user/errors/InvalidEmailError';
import { User } from '@modules/http/accounts/domain/user/user';
import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository';
import { availableFeatures } from '../../domain/user/features';

type CreateUserResponse = Either<
  | AccountAleardyExists
  | InvalidNameError
  | InvalidEmailError
  | InvalidPasswordError,
  User
>;

export class CreateUser {
  constructor(private usersRepository: IUserRepository) {}

  async execute(): Promise<CreateUserResponse> {
    const nameOrError = Name.create("admin");
    const emailOrError = Email.create("admin@gmail.com");
    const passwordOrError = Password.create("lowpixel2024");

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const accountOrErr = User.create({
      username: nameOrError.value,
      email: emailOrError.value,
      password: passwordOrError.value,
      features: Array.from(availableFeatures),
      role: "ADMIN"
    });

    if (accountOrErr.isLeft()) {
      return left(accountOrErr.value);
    }

    const account = accountOrErr.value;

    const emailAleardyExists = await this.usersRepository.exists(
      account.email.value
    );

    const usernameAleardyExists = await this.usersRepository.exists(
      account.username.value
    );

    if (emailAleardyExists || usernameAleardyExists) {
      return left(new AccountAleardyExists());
    }

    await this.usersRepository.create(account);
    // const tokenObject = await this.usersRepository.createActivationToken(
    //   account.id
    // )

    return right(account);
  }
}
