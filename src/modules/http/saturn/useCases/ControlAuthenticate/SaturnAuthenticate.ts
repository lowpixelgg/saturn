import { Either, left, right } from '@core/logic/Either'
import { JWT } from '@modules/http/accounts/domain/user/jwt'
import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository'
import { AccountInvalidPassword } from './errors/AccountInvalidPassword'
import { AccountDoesNotExist } from './errors/AccountDoesNotExist'
import { FeatureFlags } from '@modules/http/accounts/domain/user/features'
import { PermissionDenied } from '@infra/http/errors/PermissionDenied'
import { AccountDoesNotHavePermission } from './errors/AccountDoesNotHavePermission'

type TokenResponse = {
  token: string
}

type SaturnAuthenticateRequest = {
  buffer: string
}

type SaturnAuthenticateResponse = Either<
  | AccountInvalidPassword
  | PermissionDenied
  | AccountDoesNotHavePermission
  | AccountInvalidPassword,
  TokenResponse
>

export class SaturnAuthenticate {
  constructor(private usersRepository: IUserRepository) { }

  async execute({
    buffer,
  }: SaturnAuthenticateRequest): Promise<SaturnAuthenticateResponse> {
    const [, hash] = buffer.split(' ')
    const [email, password] = Buffer.from(hash, 'base64').toString().split(':')
    const account = await this.usersRepository.findOne(email)

    if (!account) {
      return left(new AccountDoesNotExist())
    }

    if (account.role !== 'ADMIN') {
      return left(new AccountDoesNotHavePermission())
    }

    const isPasswordValid = await account.password.comparePassword(password)

    if (isPasswordValid === false) {
      return left(new AccountInvalidPassword())
    }

    if (
      !FeatureFlags.can(account.features, 'create:session') &&
      FeatureFlags.can(account.features, 'read:activation_token')
    ) {
      return left(new PermissionDenied('create:session'))
    }

    const { token } = JWT.signUser(account)



    return right({
      token,
    })
  }
}
