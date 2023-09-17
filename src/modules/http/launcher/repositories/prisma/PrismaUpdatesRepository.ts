import { prisma } from '@infra/prisma/prisma-client';
import { Update } from '../../domain/Update';
import { IUpdatesRepository } from '../IUpdatesRepository';
import { UpdateMapper } from '../../mappers/UpdateMapper';
import { UserMapper } from '@modules/http/accounts/mappers/UserMapper';

export class PrismaUpdatesRepository implements IUpdatesRepository {
  async create(update: Update): Promise<void> {
    const data = UpdateMapper.toPersistence(update);

    await prisma.update.create({
      data,
    });
  }

  async getUpdatesByDate(date: Date): Promise<Update[]> {
    const dbQuery = await prisma.update.findMany({
      orderBy: {
        release: 'asc',
      },
      where: {
        release: {
          gt: date,
          not: date,
        },
      },
    });

    return dbQuery.map(u => UpdateMapper.toDomain(u));
  }
}
