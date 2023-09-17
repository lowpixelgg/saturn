import { Appointments as PersistenceAppointment } from '@prisma/client';
import { Appointment } from '../domain/Appointment';

export class AppointmentMapper {
  static toDomain(raw: PersistenceAppointment) {
    const appointment = Appointment.create(
      {
        date: raw.date,
        staff_id: raw.staff_id,
        status: raw.status,
        user_id: raw.user_id,
        channelId: raw.channelId,
        observation: raw.observation,
        name: raw.name,
      },
      raw.id
    );

    return appointment;
  }

  static toPersistence(appointment: Appointment) {
    return {
      id: appointment.id,
      staff_id: appointment.staff_id,
      status: appointment.status,
      date: appointment.date,
      user_id: appointment.user_id,
      name: appointment.name,
      observation: appointment.observation,
      channelId: appointment.channelId,
    };
  }
}
