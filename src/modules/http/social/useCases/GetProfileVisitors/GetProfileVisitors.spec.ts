import { Profile } from '@modules/http/social/domain/profiles/Profile'
import { InMemoryProfilesRepository } from '@modules/http/social/repositories/in-memory/InMemoryProfilesRepository'
import { InMemoryVisitorRepository } from '@modules/http/social/repositories/in-memory/InMemoryVisitorRepository'
import { IProfilesRepository } from '@modules/http/social/repositories/IProfilesRepository'
import { IVisitorRepository } from '@modules/http/social/repositories/IVisitorRepository'
import { expect, describe, it, beforeEach } from 'vitest'

import { GetProfileVisitors } from './GetProfileVisitors'

let visitorsRepository: IVisitorRepository
let profilesRespository: IProfilesRepository
let getProfileVisitors: GetProfileVisitors

describe('UpdateProfile', () => {
  beforeEach(() => {
    visitorsRepository = new InMemoryVisitorRepository()
    profilesRespository = new InMemoryProfilesRepository(visitorsRepository)
    getProfileVisitors = new GetProfileVisitors(
      visitorsRepository,
      profilesRespository
    )
  })

  it('should be able to fetch profile visitors', async () => {
    const visitors = await getProfileVisitors.execute({
      visitors_id: '123456',
    })

    expect(visitors.isRight()).toBeTruthy()
  })

  it('not should be able to fetch profile visitors', async () => {
    const visitors = await getProfileVisitors.execute({
      visitors_id: '123456888',
    })

    expect(visitors.isLeft()).toBeTruthy()
  })
})
