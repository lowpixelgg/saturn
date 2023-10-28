import { Follow } from '@modules/http/social/domain/profiles/Follow';
import { Follows } from '@modules/http/social/domain/profiles/Follows';
import { Profile } from '@modules/http/social/domain/profiles/Profile';
import { FollowMapper } from '@modules/http/social/mappers/FollowMapper';
import { ProfileMapper } from '@modules/http/social/mappers/ProfileMapper';
import {
  IProfilesRepository,
  SearchResponse,
} from '@modules/http/social/repositories/IProfilesRepository';
import { prisma } from '@infra/prisma/prisma-client';
import { IFollowsRepository } from '../IFollowsRepository';
import { IVisitorRepository } from '../IVisitorRepository';

export class PrismaProfilesRepository implements IProfilesRepository {
  constructor(
    private visitorsRepository?: IVisitorRepository,
    private followsRepository?: IFollowsRepository
  ) {}

  async exists(slugORId: string): Promise<boolean> {
    const dbQuery = await prisma.profile.findFirst({
      where: {
        OR: [{ slug: slugORId }, { userid: slugORId }],
      },
    });

    return !!dbQuery;
  }

  async findOne(slugORID: string): Promise<Profile> {
    const dbQuery = await prisma.profile.findFirst({
      where: {
        OR: [{ userid: slugORID }, { slug: slugORID }],
      },
      include: {
        badges: true,
        medals: true,
        user: true,
        following: true,
        followers: true,
      },
    });

    return ProfileMapper.toDomain(dbQuery);
  }

  async findAll(): Promise<Profile[]> {
    const dbQuery = await prisma.profile.findMany({
      include: {
        user: true,
        badges: true,
        medals: true,
        following: true,
        followers: true,
      },
    });

    return dbQuery.map(profile => ProfileMapper.toDomain(profile));
  }

  async save(profile: Profile): Promise<void> {
    const data = ProfileMapper.toPersistence(profile);

    await prisma.profile.update({
      where: { userid: profile.User.id },
      data,
    });

    if (this.followsRepository) {
      this.followsRepository.save(profile.follows);
    }

    if (this.visitorsRepository) {
      this.visitorsRepository.save(profile.visitors);
    }
  }

  async search(
    query: string,
    page: number,
    perPage: number,
    randomize: boolean
  ): Promise<SearchResponse> {
    const totalProfiles = await prisma.profile.count();

    let queryPayload: any = {
      take: perPage,
      skip: randomize
        ? Math.floor(Math.random() * totalProfiles)
        : (page - 1) * perPage || 0,
      where: {},
    };

    if (query) {
      queryPayload.where = {
        OR: [
          {
            user: {
              username: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        ],
      };
    }

    if (randomize) {
      queryPayload.orderBy = { id: 'asc' };
    } else {
      queryPayload.orderBy = {
        user: {
          username: 'asc',
        },
      };
    }

    const profiles = await prisma.profile.findMany({
      ...queryPayload,
      include: {
        badges: true,
        medals: true,
        user: true,
        following: true,
        followers: true,
      },
    });

    const profileCount = await prisma.profile.aggregate({
      _count: true,
      where: queryPayload.where,
    });

    return {
      data: profiles.map(profile => ProfileMapper.toDomain(profile)),
      totalCount: profileCount._count,
    };
  }
}
