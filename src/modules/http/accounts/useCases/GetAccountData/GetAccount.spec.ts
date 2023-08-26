import { UserMapper } from '@modules/http/accounts/mappers/UserMapper'
import { InMemoryUserRepository } from '@modules/http/accounts/repositories/in-memory/inMemoryUserRepository'
import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository'
import { createUser } from '@utils/tests/UserFactory'
import { describe, it, expect, beforeEach } from 'vitest'

import { GetAccountData } from './GetAccountData'

let usersRepository: IUserRepository
let getAccountData: GetAccountData

describe('GetAccountData', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    getAccountData = new GetAccountData(usersRepository)
  })

  it('should be get a user-account data', async () => {
    const create = createUser()

    await usersRepository.create(create)

    const account = await usersRepository.findOne(create.email.value)
    const user = await UserMapper.toPersistence(account)
    const getData = await getAccountData.execute({ user })

    expect(getData.isRight()).toBeTruthy()
  })

  it('not should be able to get a user-account data', async () => {
    const create = createUser()

    await usersRepository.create(create)

    const account = await usersRepository.findOne(create.email.value)
    const user = await UserMapper.toPersistence(account)

    user.id = 'aaaa@gmail.com'

    const getData = await getAccountData.execute({ user })

    expect(getData.isLeft()).toBeTruthy()
  })
})
