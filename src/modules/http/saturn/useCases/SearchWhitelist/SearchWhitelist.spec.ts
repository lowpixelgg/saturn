import { User } from '@modules/http/accounts/domain/user/user'
import { Whitelist } from '@modules/http/player/domain/Whitelist'
import { InMemoryWhitelistRepository } from '@modules/http/player/repositories/in-memory/InMemoryWhitelistRepository'
import { createUser } from '@utils/tests/UserFactory'
import { it, describe, expect, beforeEach } from 'vitest'
import { SearchWhitelist } from './SearchWhitelist'

let whitelistRepository: InMemoryWhitelistRepository
let searchWhitelist: SearchWhitelist

describe('Search Profiles', () => {
  beforeEach(async () => {
    whitelistRepository = new InMemoryWhitelistRepository()
    searchWhitelist = new SearchWhitelist(whitelistRepository)

    for (let i = 0; i < 20; i++) {
      const user = createUser({ username: `user${i}` })

      const whitelist = Whitelist.create({
        user: user,
      })

      whitelistRepository.create(whitelist)
    }
  })

  it('should be able to search profile 1', async () => {
    const response = await searchWhitelist.execute({
      query: '',
    })

    expect(response.data.length).toEqual(20)
    expect(response.totalCount).toEqual(20)
  })

  it('should be able to search profile 2', async () => {
    const response = await searchWhitelist.execute({
      query: '1',
    })

    expect(response.data.length).toEqual(11)
    expect(response.totalCount).toEqual(11)
  })

  it('should not be able to search whitelist', async () => {
    const response = await searchWhitelist.execute({
      query: '1231231231232313123231231',
    })

    expect(response.data.length).toEqual(0)
    expect(response.totalCount).toEqual(0)
  })
})
