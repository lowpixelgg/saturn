import { InMemoryProfilesRepository } from '@modules/http/social/repositories/in-memory/InMemoryProfilesRepository'
import { IProfilesRepository } from '@modules/http/social/repositories/IProfilesRepository'
import { expect, describe, it, beforeEach } from 'vitest'

import { UpdateProfile } from './UpdateProfile'

let profilesRespository: IProfilesRepository
let updateProfile: UpdateProfile

describe('UpdateProfile', () => {
  beforeEach(() => {
    profilesRespository = new InMemoryProfilesRepository()
    updateProfile = new UpdateProfile(profilesRespository)
  })

  it('should be able to update user-profile / social', async () => {
    const update = await updateProfile.execute({
      user: { id: '12345' },
      nickname: 'nytroires',
      region_city: 'NY',
      region_country: 'USA',
      region_uf: 'NY',
      slug: 'negodoborel',
      status: 'I living on New York',
      action: 'update:social',
    })

    const updateAbout = await updateProfile.execute({
      user: { id: '12345' },
      description: 'hello world',
      instagram: 'https://google.com',
      youtube: 'https://google.com',
      twitch: 'https://google.com',
      action: 'update:bio',
    })

    expect(updateAbout.isRight()).toBeTruthy()
    expect(update.isRight()).toBeTruthy()
  })

  // it('should be not able to update with invalid user', async () => {
  //   const update = await updateProfile.execute({
  //     user: { id: '66666' },
  //     nickname: 'nytroires',
  //     region_city: 'NY',
  //     region_country: 'USA',
  //     region_uf: 'NY',
  //     slug: 'jhondoe',
  //     status: 'I living on New York',
  //     action: 'update:social',
  //   })

  //   expect(update.isLeft()).toBeTruthy()
  // })

  // it('should be not able to update user with already use slug', async () => {
  //   const update = await updateProfile.execute({
  //     user: { id: '12345' },
  //     nickname: 'nytroires',
  //     region_city: 'NY',
  //     region_country: 'USA',
  //     region_uf: 'NY',
  //     slug: 'jhondoe12',
  //     status: 'I living on New York',
  //     action: 'update:social',
  //   })

  //   expect(update.isLeft()).toBeTruthy()
  // })

  // it('not should be able to update user slug if not a Premium', async () => {
  //   const update = await updateProfile.execute({
  //     user: { id: '12345' },
  //     nickname: 'nytroires',
  //     region_city: 'NY',
  //     region_country: 'USA',
  //     region_uf: 'NY',
  //     slug: 'jhondoe12',
  //     status: 'I living on New York',
  //     action: 'update:social',
  //   })

  //   expect(update.isLeft()).toBeTruthy()
  // })
})
