import { Whitelist } from '@modules/http/player/domain/Whitelist'
import { InMemoryWhitelistRepository } from '@modules/http/player/repositories/in-memory/InMemoryWhitelistRepository'
import { describe, it, expect, beforeEach } from 'vitest'
import { GetWhitelistDetails } from './GetWhitelistDetails'

let whitelistRepository: InMemoryWhitelistRepository
let getWhitelistDetails: GetWhitelistDetails

describe('Get Whitelist Details', () => {
  beforeEach(async () => {
    whitelistRepository = new InMemoryWhitelistRepository()
    getWhitelistDetails = new GetWhitelistDetails(whitelistRepository)
  })

  it('should be able to get whitelist data', async () => {
    const whitelist = Whitelist.create({})

    await whitelistRepository.create(whitelist)

    const result = await getWhitelistDetails.execute({ id: whitelist.id })

    expect(result.isRight()).toBeTruthy()
  })

  it('should not ble able to get whitelist data', async () => {
    const result = await getWhitelistDetails.execute({ id: 'brenobenio' })
    expect(result.isLeft()).toBeTruthy()
  })
})
