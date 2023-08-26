import { expect, describe, it } from 'vitest'
import { Email } from './Email'
import { Name } from './Username'
import { User } from './user'
import { Password } from './Password'

describe('Name model', () => {
  it('should be able to create new name', () => {
    const username = Name.create('John Doe').value as Name
    const email = Email.create('johndoe@example').value as Email
    const password = Password.create('1234567').value as Password
    const accountOrErr = User.create({
      username,
      email,
      password,
    })
    expect(accountOrErr.isRight()).toBeTruthy()
  })
})
