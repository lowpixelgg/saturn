import { prisma } from '@infra/prisma/prisma-client'
import { Appointment } from '../../domain/Appointment'
import { AppointmentMapper } from '../../mappers/AppointmentMapper'
import { IAppointmentsRepository } from '../IAppointmentsRepository'

export class PrismaAppointmentsRepository implements IAppointmentsRepository {
  async findById(id: string): Promise<Appointment> {
    const dbQuery = await prisma.appointments.findUnique({
      where: {
        id,
      },
    })

    return AppointmentMapper.toDomain(dbQuery)
  }

  async create(appointment: Appointment): Promise<void> {
    const data = AppointmentMapper.toPersistence(appointment)

    await prisma.appointments.create({
      data,
    })
  }

  async save(appointment: Appointment): Promise<void> {
    const data = AppointmentMapper.toPersistence(appointment)

    await prisma.appointments.update({
      where: {
        id: appointment.id,
      },
      data,
    })
  }

  async findByStaff(staffId: string): Promise<Appointment[]> {
    const dbQuery = await prisma.appointments.findMany({
      where: {
        staff_id: staffId,
      },
    })

    return dbQuery.map(appointment => AppointmentMapper.toDomain(appointment))
  }

  async findByUser(userId: string): Promise<Appointment> {
    const dbQuery = await prisma.appointments.findFirst({
      where: {
        user_id: userId,
      },
    })

    if (!dbQuery) {
      return null
    }

    return AppointmentMapper.toDomain(dbQuery)
  }

  async deleteById(id: string): Promise<void> {
    await prisma.appointments.delete({
      where: {
        id: id,
      },
    })
  }
}
