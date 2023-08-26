import { Either, left, right } from '@core/logic/Either'
import { Email } from '@modules/http/accounts/domain/user/Email'
import { Password } from '@modules/http/accounts/domain/user/Password'
import { Name } from '@modules/http/accounts/domain/user/Username'
import { AccountAleardyExists } from '@modules/http/accounts/useCases/RegisterUser/errors/AccountAleardyExists'
import { InvalidPasswordError } from '@modules/http/accounts/domain/user/errors/InvalidPasswordError'
import { InvalidNameError } from '@modules/http/accounts/domain/user/errors/InvalidNameError'
import { InvalidEmailError } from '@modules/http/accounts/domain/user/errors/InvalidEmailError'
import { User } from '@modules/http/accounts/domain/user/user'
import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository'
import Queue from '@infra/libs/Queue/bull'
import { Token } from '../../domain/user/Token'

type RegisterUserRequest = {
  name: string
  email: string
  password: string
}

type RegisterUserResponse = Either<
  | AccountAleardyExists
  | InvalidNameError
  | InvalidEmailError
  | InvalidPasswordError,
  User
>

export class RegisterUser {
  constructor(private usersRepository: IUserRepository) { }

  async execute({
    name,
    email,
    password,
  }: RegisterUserRequest): Promise<RegisterUserResponse> {
    const nameOrError = Name.create(name)
    const emailOrError = Email.create(email)
    const passwordOrError = Password.create(password)

    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value)
    }

    const accountOrErr = User.create({
      username: nameOrError.value,
      email: emailOrError.value,
      password: passwordOrError.value,
      features: ['read:activation_token'],
    })

    if (accountOrErr.isLeft()) {
      return left(accountOrErr.value)
    }

    const account = accountOrErr.value

    const emailAleardyExists = await this.usersRepository.exists(
      account.email.value
    )

    const usernameAleardyExists = await this.usersRepository.exists(
      account.username.value
    )

    if (emailAleardyExists || usernameAleardyExists) {
      return left(new AccountAleardyExists())
    }

    // Here is called the email sending service,
    // where the email will be sent to the user to confirm.
    const token = Token.create({
      type: 'activation',
      user_id: account.id,
      used: false,
    })

    account.addToken(token)

    await this.usersRepository.create(account)
    // const tokenObject = await this.usersRepository.createActivationToken(
    //   account.id
    // )

    // Sending the Activation-mail to user.
    await Queue.add('RegistrationMail', {
      name: account.username.value,
      email: account.email.value,
      activation_token: token.id,
    })


    return right(account)
  }
}
