import {
  Badges,
  Follower,
  Medals,
  Profile as ProfileRaw,
  User,
} from '@prisma/client'
import { Follows } from '../domain/profiles/Follows'
import { FollowMapper } from './FollowMapper'
import { Profile } from '../domain/profiles/Profile'
import { Follow } from '../domain/profiles/Follow'

export type PersistenceProfileRaw = ProfileRaw & {
  user?: User
  following?: Follower[]
  followers?: Follower[]
  badges?: Badges[]
  medals?: Medals[]
}

type topPeristenceRaw = {
  avatar: string
  banner: string
  region_city: string
  region_uf: string
  region_country: string
  status: string
  nickname: string
  description: string
  youtube: string
  twitch: string
  instagram: string
  slug: string
}

export class ProfileMapper {
  static toDomain(raw: PersistenceProfileRaw): Profile {
    const profileOrError = Profile.create(
      {
        User: raw.user,
        avatar: raw.avatar,
        banner: raw.banner,
        badges: raw.badges,
        medals: raw.medals,
        followers: raw.followers,
        region_city: raw.region_city,
        region_uf: raw.region_uf,
        region_country: raw.region_country,
        status: raw.status,
        following: raw.following,
        nickname: raw.nickname,
        description: raw.description,
        youtube: raw.youtube,
        twitch: raw.twitch,
        whitelist: raw.user.status,
        instagram: raw.instagram,
        slug: raw.slug,
        timeout: raw.user.timeout,
        userid: '', // remove
      },
      raw.id
    )

    if (profileOrError.isRight()) {
      return profileOrError.value
    }

    return null
  }

  static toPersistence(raw: topPeristenceRaw) {
    return {
      avatar: raw.avatar,
      banner: raw.banner,
      region_city: raw.region_city,
      region_uf: raw.region_uf,
      region_country: raw.region_country,
      status: raw.status,
      nickname: raw.nickname,
      description: raw.description,
      youtube: raw.youtube,
      twitch: raw.twitch,
      instagram: raw.instagram,
      slug: raw.slug,
    }
  }
}
