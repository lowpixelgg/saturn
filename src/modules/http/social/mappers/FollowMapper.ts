import { Profile, Follower as PersistenceFollower } from '@prisma/client';
import { Follow } from '@modules/http/social/domain/profiles/Follow';

type PersistenceFollowRaw = PersistenceFollower & {
  following: Profile;
};

export class FollowMapper {
  static toDomain(raw: PersistenceFollowRaw): Follow {
    const follow = Follow.create(
      {
        followers_id: raw.followers_id,
        following_id: raw.following_id,
        following: raw.following,
      },
      raw.id
    );

    return follow;
  }

  static toPersistence(follow: Follow) {
    return {
      id: follow.id,
      followers_id: follow.followers_id,
      following_id: follow.following_id,
      following: follow.following,
    };
  }
}
