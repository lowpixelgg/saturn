import { Follow } from '@modules/http/social/domain/profiles/Follow';
import { Follows } from '@modules/http/social/domain/profiles/Follows';
import { FollowMapper } from '@modules/http/social/mappers/FollowMapper';
import { prisma } from '@infra/prisma/prisma-client';
import { FindByProfileParams, IFollowsRepository } from '../IFollowsRepository';

export class PrismaFollowsRepository implements IFollowsRepository {
  constructor() {}

  async findByProfileParams(params: FindByProfileParams): Promise<Follow> {
    const dbQuery = await prisma.follower.findFirst({
      where: {
        followers_id: params.followers_id,
        following_id: params.following_id,
      },
      include: {
        following: true,
      },
    });

    if (!dbQuery) {
      return null;
    }

    return FollowMapper.toDomain(dbQuery);
  }

  async findAllByProfileParams(params: FindByProfileParams): Promise<Follow[]> {
    const dbQuery = await prisma.follower.findMany({
      where: { followers_id: params.followers_id },
      take: 50,
      include: {
        following: true,
      },
    });

    if (!dbQuery) {
      return null;
    }

    return dbQuery.map(visitor => FollowMapper.toDomain(visitor));
  }

  async save(follows: Follows): Promise<void> {
    if (follows.getNewItems().length > 0) {
      const data = follows
        .getNewItems()
        .map(follow => FollowMapper.toPersistence(follow));

      await prisma.follower.createMany({
        data,
      });
    }

    if (follows.getRemovedItems().length > 0) {
      const removeIds = follows.getRemovedItems().map(follow => follow.id);
      await prisma.follower.deleteMany({
        where: {
          id: {
            in: removeIds,
          },
        },
      });
    }
  }

  async create(follows: Follows): Promise<void> {
    const data = follows
      .getItems()
      .map(visitor => FollowMapper.toPersistence(visitor));

    await prisma.follower.createMany({
      data,
    });
  }
}
