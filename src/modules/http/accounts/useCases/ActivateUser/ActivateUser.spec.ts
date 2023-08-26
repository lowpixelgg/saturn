import { describe, it, expect, beforeEach } from 'vitest'
import { createUser } from '@utils/tests/UserFactory'
import { InMemoryUserRepository } from '@modules/http/accounts/repositories/in-memory/inMemoryUserRepository'
import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository'
import { ActivateUser } from './ActivateUser'
import { ITokensRepository } from '../../repositories/ITokensRepository'
import { InMemoryTokensRepository } from '../../repositories/in-memory/InMemoryTokensRepository'
import { Token } from '../../domain/user/Token'
import { Tokens } from '../../domain/user/Tokens'

let tokensRepository: ITokensRepository
let usersRepository: IUserRepository
let activateUser: ActivateUser

describe('ActivateUser', () => {
  beforeEach(() => {
    tokensRepository = new InMemoryTokensRepository()
    usersRepository = new InMemoryUserRepository()
    activateUser = new ActivateUser(usersRepository, tokensRepository)
  })

  it('should me able to user activate your accont', async () => {
    const user = createUser({
      features: ['read:activation_token'],
    })
    await usersRepository.create(user)
    const tokenObject = Token.create({
      type: 'activation',
      used: false,
      user_id: user.id,
    })
    await tokensRepository.create(Tokens.create([tokenObject]))
    const result = await activateUser.execute({ id: tokenObject.id })

    expect(result.isRight()).toBeTruthy()
  })
})
