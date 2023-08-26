import { Either, left, right } from '@core/logic/Either'
import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository'
import { ServiceTokenExpired } from './errors/ServiceTokenExpired'
import { ServiceTokenAlreadyUsed } from './errors/ServiceTokenAlreadyUsed'
import { ServiceTokenNotFound } from './errors/ServiceTokenNotFound'
import dayjs from 'dayjs'
import { Notification } from '@modules/http/accounts/domain/user/Notification'
import { ITokensRepository } from '../../repositories/ITokensRepository'
import { Token } from '../../domain/user/Token'
import { ServiceTokenNotValid } from './errors/ServiceTokenNotValid'

type ActivateUserRequest = {
  id: string
}

type ActivateUserResponse = Either<
  | ServiceTokenAlreadyUsed
  | ServiceTokenExpired
  | ServiceTokenNotValid
  | ServiceTokenNotFound,
  Token
>

export class ActivateUser {
  constructor(
    private usersRepository: IUserRepository,
    private tokenRepository: ITokensRepository
  ) { }

  async execute({ id }: ActivateUserRequest): Promise<ActivateUserResponse> {
    const token = await this.tokenRepository.getById(id)

    if (!token) {
      return left(new ServiceTokenNotFound())
    }

    if (token.type !== 'activation') {
      return left(new ServiceTokenNotValid())
    }

    if (token.used) {
      return left(new ServiceTokenAlreadyUsed())
    }

    if (dayjs().isAfter(dayjs.unix(token.expiresIn))) {
      return left(new ServiceTokenExpired())
    }

    // activate the user by-features
    const account = await this.usersRepository.findOne(token.userId)

    // TODO: in the future, understand how to run
    // this inside a transaction, or at least
    // reduce how many queries are run.
    account.removeFeatures(['read:activation_token'])
    account.addFeatures([
      'create:user',
      'read:user',
      'read:user:self',
      'read:user:list',
      'create:whitelist',
      'create:appointment',
      'update:profile:self',
      'profile:subscribe',
      'read:subscribers:list',
      'profile:unsubscribe',
      'create:session',
      'create:post',
      'read:post',
      'read:comments',
      'read:post:list',
      'create:comment',
      'update:post',
      'delete:post',
    ])

    const notify = Notification.create({
      read: false,
      small:
        'Hey ' +
        account.username.value +
        ', é ótimo ter você por aqui! Lembre-se que esta é uma versão Beta da plataforma. Se você estiver com alguma dúvida, ou encontrar algum erro, não hesite em entrar em contato com nosso time de suporte no Discord!',
      userid: account.id,
    })

    account.addNotification(notify)

    // mark the request token to used
    // await this.usersRepository.markActivationTokenHasUsed(token)

    token.markHasUsed = true

    await this.usersRepository.save(account)
    await this.tokenRepository.saveSingle(token)

    return right(token)
  }
}
