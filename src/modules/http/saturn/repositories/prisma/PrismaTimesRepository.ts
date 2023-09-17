import { prisma } from '@infra/prisma/prisma-client';
import { Time } from '../../domain/Time';
import { Times } from '../../domain/Times';
import { TimeMapper } from '../../mappers/TimeMapper';
import { ITimesRepository } from '../ITimesRepository';

export class PrismaTimesRepository implements ITimesRepository {
  async getWeekTimes(gt: any): Promise<Time[]> {
    const dbQuery = await prisma.time.findMany({
      where: {
        scheduled: false,
        Date: {
          gt: gt,
        },
      },
    });

    return dbQuery.map(time => TimeMapper.toDomain(time));
  }

  async create(times: Times): Promise<void> {
    const data = times
      .getNewItems()
      .map(time => TimeMapper.toPersistence(time));

    await prisma.time.createMany({
      data,
    });
  }

  async save(times: Times): Promise<void> {
    if (times.getNewItems().length > 0) {
      const data = times
        .getNewItems()
        .map(time => TimeMapper.toPersistence(time));

      await prisma.time.createMany({
        data,
      });
    }

    if (times.getRemovedItems().length > 0) {
      const removeIds = times.getRemovedItems().map(time => time.id);

      await prisma.time.deleteMany({
        where: {
          id: {
            in: removeIds,
          },
        },
      });
    }
  }

  async getWeekTimeById(timeId: string): Promise<Time> {
    const dbQuery = await prisma.time.findUnique({
      where: {
        id: timeId,
      },
    });

    if (!dbQuery) {
      return null;
    }

    return TimeMapper.toDomain(dbQuery);
  }

  async saveSingle(time: Time): Promise<void> {
    const data = TimeMapper.toPersistence(time);
    await prisma.time.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
}
