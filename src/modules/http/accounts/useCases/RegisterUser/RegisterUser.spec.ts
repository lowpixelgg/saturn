import { describe, beforeEach, it, expect } from 'vitest'
import { RegisterUser } from './RegisterUser'
import { AccountAleardyExists } from './errors/AccountAleardyExists'
import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository'
import { InMemoryUserRepository } from '@modules/http/accounts/repositories/in-memory/inMemoryUserRepository'
import { createUser } from '@utils/tests/UserFactory'

let usersRepository: IUserRepository
let registerUser: RegisterUser

describe('Register user Account', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    registerUser = new RegisterUser(usersRepository)
  })

  /* Testing the registerUser.execute function. */
  /* Testing the registerUser.execute function. */
  // it('should be able to register a new user', async () => {
  //   const response = await registerUser.execute({
  //     name: 'Jhon Doe',
  //     email: 'jhon@doe.com',
  //     password: '123456',
  //   })

  //   expect(await usersRepository.exists('jhon@doe.com')).toBeTruthy()
  //   expect(response.isRight()).toBeTruthy()
  // })

  it('should not be able to register a new user with invalid data', async () => {
    const response = await registerUser.execute({
      name: 'JhonDoe',
      email: 'jhon',
      password: '123',
    })

    expect(response.isLeft()).toBeTruthy()
  })

  it('should not be able to register a new user with existing email', async () => {
    const user = createUser({
      email: 'jhon@doe.com',
    })

    usersRepository.create(user)

    const response = await registerUser.execute({
      name: 'JhonDoe',
      email: 'jhon@doe.com',
      password: '1234561',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(new AccountAleardyExists())
  })
})
