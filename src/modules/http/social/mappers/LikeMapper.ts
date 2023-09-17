import { Likes as PersistenceLike } from '@prisma/client';
import { Like } from '../domain/timeline/Like';

type LikePersistenceRaw = {
  id: string;
  authorId: string;
  postId: string;
  createdAt?: Date;
};

export class LikeMapper {
  static toDomain(raw: PersistenceLike): Like {
    const like = Like.create(
      {
        authorId: raw.authorId,
        postId: raw.postId,
        createdAt: raw.createdAt,
      },
      raw.id
    );

    return like;
  }

  static toPersistence(like: LikePersistenceRaw) {
    return {
      id: like.id,
      authorId: like.authorId,
      postId: like.postId,
    };
  }
}
