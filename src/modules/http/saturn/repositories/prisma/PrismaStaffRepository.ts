import { prisma } from '@infra/prisma/prisma-client'
import { Staff } from '../../domain/Staff'
import { StaffMapper } from '../../mappers/StaffMapper'
import { IStaffReposiotry } from '../IStaffRepository'
import { ITimesRepository } from '../ITimesRepository'

export class PrismaStaffRepository implements IStaffReposiotry {
  constructor(private timesRepository?: ITimesRepository) {}

  async findByUserID(id: string): Promise<Staff> {
    const dbQuery = await prisma.staff.findUnique({
      where: {
        user_id: id,
      },
      include: {
        Times: true,
      },
    })

    if (!dbQuery) {
      return null
    }

    return StaffMapper.toDomain(dbQuery)
  }

  async exists(id: string): Promise<boolean> {
    const dbQuery = await prisma.staff.findUnique({
      where: { user_id: id },
    })

    return !!dbQuery
  }

  async create(staff: Staff): Promise<void> {
    const data = StaffMapper.toPersistence(staff)

    await prisma.staff.create({
      data,
    })

    if (this.timesRepository) {
      await this.timesRepository.create(staff.times)
    }
  }

  async save(staff: Staff): Promise<void> {
    const data = StaffMapper.toPersistence(staff)

    await prisma.staff.update({
      where: {
        user_id: data.user_id,
      },
      data,
    })

    if (this.timesRepository) {
      await this.timesRepository.save(staff.times)
    }
  }

  async findById(id: string): Promise<Staff> {
    const dbQuery = await prisma.staff.findUnique({
      where: {
        id: id,
      },
      include: {
        Times: true,
      },
    })

    return StaffMapper.toDomain(dbQuery)
  }
}
