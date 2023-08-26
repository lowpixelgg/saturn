import { Profile } from '@modules/http/social/domain/profiles/Profile'
import { Visitor } from '@modules/http/social/domain/profiles/Visitor'
import { Visitors } from '@modules/http/social/domain/profiles/Visitors'
import { VisitorMapper } from '@modules/http/social/mappers/VisitorMapper'
import { prisma } from '@infra/prisma/prisma-client'
import { FindByProfileParams, IVisitorRepository } from '../IVisitorRepository'

export class PrismaVisitorsRepository implements IVisitorRepository {
  constructor() {}

  async findByProfileParams(params: FindByProfileParams): Promise<Visitor> {
    const dbQuery = await prisma.visitor.findFirst({
      where: { visitors_id: params.visitors_id, visitor_id: params.visitor_id },
      include: {
        visitor: true,
      },
    })

    if (!dbQuery) {
      return null
    }

    return VisitorMapper.toDomain(dbQuery)
  }

  async findAllByProfileParams(
    params: FindByProfileParams
  ): Promise<Visitor[]> {
    const dbQuery = await prisma.visitor.findMany({
      where: { visitors_id: params.visitors_id },
      take: 36,
      orderBy: { at: 'desc' },
      include: {
        visitor: true,
      },
    })

    if (!dbQuery) {
      return null
    }

    return dbQuery.map(visitor => VisitorMapper.toDomain(visitor))
  }

  async save(visitors: Visitors): Promise<void> {
    if (visitors.getNewItems().length > 0) {
      const data = visitors
        .getNewItems()
        .map(visitor => VisitorMapper.toPersistence(visitor))

      await prisma.visitor.createMany({
        data,
      })
    }

    if (visitors.getRemovedItems().length > 0) {
      const removeIds = visitors.getRemovedItems().map(visitor => visitor.id)

      await prisma.visitor.deleteMany({
        where: {
          id: {
            in: removeIds,
          },
        },
      })
    }
  }

  async create(visitors: Visitors): Promise<void> {
    const data = visitors
      .getItems()
      .map(visitor => VisitorMapper.toPersistence(visitor))

    await prisma.visitor.createMany({
      data,
    })
  }
}
