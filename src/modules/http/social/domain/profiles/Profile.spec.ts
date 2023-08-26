import { expect, describe, it } from 'vitest'
import { Profile } from './Profile'

describe('Social model', () => {
  it('should be able to create new profile', async () => {
    const userProfile = Profile.create({
      avatar: 'google.com',
      banner: 'google.com',
      badges: [],
      medals: [],
      description: 'Ola',
      nickname: 'jhondoe',
      region_city: 'Santa rosa',
      region_country: 'Brazil',
      region_uf: 'RS',
      status: 'Olá Mundo!',
      slug: 'jhondoe',
      following: undefined,
      whitelist: '',
      youtube: '',
      twitch: '',
      instagram: '',
      timeout: 0,
      userid: '',
    })

    expect(userProfile.isRight()).toBeTruthy()
  })
})
