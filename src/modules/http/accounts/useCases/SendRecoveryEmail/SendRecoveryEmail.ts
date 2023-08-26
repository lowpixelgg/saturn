import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository'
import { Either, left, right } from '@core/logic/Either'
import { SendRecoveryUserNotFound } from './errors/SendRecoveryUserNotFound'
import Queue from '@infra/libs/Queue/bull'
import { Token } from '../../domain/user/Token'

type SendRecoveryEmailRequest = {
  email: string
}

type SendRecoveryEmailResponse = Either<SendRecoveryUserNotFound, Token>

export class SendRecoveryEmail {
  constructor(private usersRepository: IUserRepository) { }

  async execute({
    email,
  }: SendRecoveryEmailRequest): Promise<SendRecoveryEmailResponse> {
    const user = await this.usersRepository.findOne(email)

    if (!user) {
      return left(new SendRecoveryUserNotFound())
    }

    const token = Token.create({
      type: 'recovery',
      user_id: user.id,
      used: false,
    })

    // const tokenObject = await this.usersRepository.createRecoveryToken(user.id)

    await Queue.add('RecoveryMail', {
      name: user.username.value,
      email: user.email.value,
      recovery_token: token.id,
    })


    user.addToken(token)

    await this.usersRepository.save(user)

    return right(token)
  }
}
