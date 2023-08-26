import { createUser } from '@utils/tests/UserFactory'
import { expect, describe, it } from 'vitest'
import { Email } from './Email'
import { Name } from './Name'
import { Profile } from './Profile'

describe('Social model', () => {
  it('should be able to create a name', async () => {
    const nameOrErr = Name.create('Flashiizin')
    expect(nameOrErr.isRight()).toBeTruthy()
  }),
    it('shoud be not able to create a name', async () => {
      const nameOrErr = Name.create('a')

      expect(nameOrErr.isLeft()).toBeTruthy()
    })
})
