import { Follows } from '@modules/http/social/domain/profiles/Follows'
import { Profile } from '@modules/http/social/domain/profiles/Profile'
import {
  PersistenceProfileRaw,
  ProfileMapper,
} from '@modules/http/social/mappers/ProfileMapper'
import {
  IProfilesRepository,
  SearchResponse,
} from '@modules/http/social/repositories/IProfilesRepository'
import { IFollowsRepository } from '../IFollowsRepository'
import { IVisitorRepository } from '../IVisitorRepository'

export class InMemoryProfilesRepository implements IProfilesRepository {
  public items: Profile[] = []

  constructor(
    private visitorsRepository?: IVisitorRepository,
    private followsRepository?: IFollowsRepository
  ) {
    const following = Follows.create([])

    const profile = Profile.create({
      User: {
        id: '12345',
        username: 'benio',
        createdAt: new Date(),
        email: 'jhondoe@jhondoe.com',
        features: [],
        auth_system: 'NORMAL',
        isPremium: true,
        isVerified: false,
        password: '12345',
        status: null,
        timeout: 0,
        role: 'USER',
      },
      avatar: 'google.com',
      banner: 'google.com',
      badges: [],
      medals: [],
      description: 'Ola',
      nickname: 'lenio',
      region_city: 'Santa rosa',
      region_country: 'Brazil',
      region_uf: 'RS',
      status: 'Olá Mundo!',
      instagram: '',
      twitch: '',
      youtube: '',
      slug: 'jhondoe',
      followers: [],
      whitelist: '',
      timeout: 0,
      following: [
        {
          following_id: '12345',
          followers_id: '123456',
        },
      ],
      userid: '',
    })

    const profile2 = Profile.create({
      User: {
        id: '123456',
        username: 'jhondoe2',
        createdAt: new Date(),
        email: 'jhondoe@jhondoe.com',
        features: [],
        isPremium: false,
        auth_system: 'NORMAL',
        isVerified: false,
        status: null,
        timeout: 0,
        password: '123456',
        role: 'USER',
      },
      avatar: 'google.com',
      banner: 'google.com',
      badges: [],
      medals: [],
      userid: '',
      description: 'Ola',
      nickname: 'jhondoe12',
      region_city: 'Santa rosa',
      region_country: 'Brazil',
      region_uf: 'RS',
      status: 'Olá Mundo!',
      instagram: '',
      twitch: '',
      youtube: '',
      followers: [],
      slug: 'jhondoe12',
      whitelist: '',
      timeout: 0,
      following: [],
    })

    if (profile.isRight()) {
      this.items.push(profile.value)
    }

    if (profile2.isRight()) {
      this.items.push(profile2.value)
    }
  }

  async exists(slugORID: string): Promise<boolean> {
    const bySLUG = this.items.find(profile => profile.slug === slugORID)

    if (bySLUG !== undefined) {
      return true
    }

    const byID = this.items.find(profile => profile.User.id === slugORID)
    if (byID) {
      return true
    }

    return false
  }

  async findOne(slugORID: string): Promise<Profile> {
    const bySLUG = this.items.find(profile => profile.slug === slugORID)

    if (bySLUG !== undefined) {
      return bySLUG
    }

    const byID = this.items.find(profile => profile.User.id === slugORID)

    if (byID !== undefined) {
      return byID
    }

    return null
  }

  async findAll(): Promise<Profile[]> {
    return this.items
  }

  async search(
    query: string,
    page: number,
    perPage: number
  ): Promise<SearchResponse> {
    let profileList = this.items

    if (query) {
      profileList = this.items.filter(profile => {
        const search = new RegExp(query, 'i')

        return search.test(profile.User.username)
      })
    }

    return {
      data: profileList.slice((page - 1) * perPage, page * perPage),
      totalCount: profileList.length,
    }
  }

  async save(profile: Profile): Promise<void> {
    const index = this.items.findIndex(find => find.id === profile.User.id)
    this.items[index] = profile

    if (profile.visitors) {
      if (this.visitorsRepository) {
        this.visitorsRepository.save(profile.visitors)
      }
    }

    if (profile.follows) {
      if (this.visitorsRepository) {
        this.visitorsRepository.create(profile.visitors)
      }
    }
  }
}
