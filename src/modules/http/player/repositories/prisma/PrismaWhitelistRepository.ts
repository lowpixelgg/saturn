import { Whitelist } from '@modules/http/player/domain/Whitelist'
import { WhitelistMapper } from '@modules/http/player/mappers/WhitelistMapper'
import { prisma } from '@infra/prisma/prisma-client'
import { IAnswerRepository } from '../IAnswerRepository'
import { IWhitelistRepository, SearchResponse } from '../IWhitelistRepository'

export class PrismaWhitelistRepository implements IWhitelistRepository {
  constructor(private answersRepository?: IAnswerRepository) {}

  async exists(ident: string): Promise<boolean> {
    const exists = await prisma.whitelist.findFirst({
      where: {
        OR: [{ id: ident }, { user_id: ident }],
      },
    })
    return !!exists
  }

  async create(whitelist: Whitelist): Promise<void> {
    const data = WhitelistMapper.toPersistence(whitelist)

    await prisma.whitelist.create({
      data: {
        id: data.id,
        user: { connect: { id: data.user_id } },
        status: data.status,
        createdAt: data.createdAt,
      },
    })
  }

  async search(
    query: string,
    page: number,
    perPage: number
  ): Promise<SearchResponse> {
    const queryPayload = {
      take: perPage,
      skip: (page - 1) * perPage || 0,
      where: {},
    }

    if (query) {
      queryPayload.where = {
        OR: {
          user: { username: { contains: query, mode: 'insensitive' } },
        },
      }
    }

    const whitelist = await prisma.whitelist.findMany({
      ...queryPayload,
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        exam: true,
        user: { include: { Profile: true, Staff: true } },
      },
    })

    const profileCount = await prisma.whitelist.aggregate({
      _count: true,
      where: queryPayload.where,
    })

    return {
      data: whitelist.map(profile => WhitelistMapper.toDomain(profile)),
      totalCount: profileCount._count,
    }
  }

  async findOneByID(id: string): Promise<Whitelist> {
    const dbQuery = await prisma.whitelist.findUnique({
      where: { id },
      include: {
        user: {
          include: {
            Profile: true,
            Staff: true,
          },
        },
        exam: true,
      },
    })

    return WhitelistMapper.toDomain(dbQuery)
  }

  async findOneByUserID(id: string): Promise<Whitelist> {
    const dbQuery = await prisma.whitelist.findUnique({
      where: { user_id: id },
      include: {
        user: {
          include: {
            Profile: true,
            Staff: true,
            appointment: true,
          },
        },
        exam: true,
      },
    })

    return WhitelistMapper.toDomain(dbQuery)
  }

  async save(whitelist: Whitelist): Promise<void> {
    const data = WhitelistMapper.toPersistence(whitelist)

    await prisma.whitelist.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    })

    if (this.answersRepository) {
      await this.answersRepository.save(whitelist.exam)
    }
  }

  async deleteByID(id: string): Promise<void> {
    await prisma.exam.deleteMany({ where: { whitelist_id: id } })
    await prisma.whitelist.delete({ where: { id } })
  }
}
