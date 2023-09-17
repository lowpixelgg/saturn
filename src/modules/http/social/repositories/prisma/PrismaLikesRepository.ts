import { Like } from '@modules/http/social/domain/timeline/Like';
import { Likes } from '@modules/http/social/domain/timeline/Likes';
import { LikeMapper } from '@modules/http/social/mappers/LikeMapper';
import { prisma } from '@infra/prisma/prisma-client';
import ILikesRepository from '../ILikesRepository';

export class PrismaLikesRepository implements ILikesRepository {
  constructor() {}

  async exists(postId: string, authorId: string): Promise<boolean> {
    const dbQuery = await prisma.likes.findFirst({
      where: { authorId: authorId, postId: postId },
    });

    return !!dbQuery;
  }

  async create(likes: Likes): Promise<void> {
    const data = likes.getItems().map(like => LikeMapper.toPersistence(like));

    await prisma.likes.createMany({
      data: data,
    });
  }

  async save(likes: Likes): Promise<void> {
    if (likes.getNewItems().length > 0) {
      const data = likes
        .getNewItems()
        .map(like => LikeMapper.toPersistence(like));

      await prisma.likes.createMany({
        data,
      });
    }

    if (likes.getRemovedItems().length > 0) {
      const removeIds = likes.getRemovedItems().map(like => like.id);
      await prisma.likes.deleteMany({
        where: {
          id: {
            in: removeIds,
          },
        },
      });
    }
  }

  async findOne(postId: string, authorId: string): Promise<Like> {
    const dbQuery = await prisma.likes.findFirst({
      where: { authorId: authorId, postId: postId },
    });

    return LikeMapper.toDomain(dbQuery);
  }
}
