import { Appointment } from '../domain/Appointment'

export interface IAppointmentsRepository {
  create(appointment: Appointment): Promise<void>
  save(appointment: Appointment): Promise<void>
  findByStaff(staffId: string): Promise<Appointment[]>
  findByUser(userId: string): Promise<Appointment>
  findById(id: string): Promise<Appointment>
  deleteById(id: string): Promise<void>
}
