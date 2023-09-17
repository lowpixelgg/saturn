import { Appointment } from '../../domain/Appointment';
import { IAppointmentsRepository } from '../IAppointmentsRepository';

export class InMemoryAppointmentsRepository implements IAppointmentsRepository {
  private items: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment);
  }
  async save(appointment: Appointment): Promise<void> {
    const index = this.items.findIndex(
      appointment => appointment.id === appointment.id
    );

    this.items[index] = appointment;
  }

  async findByStaff(staffId: string): Promise<Appointment[]> {
    const index = this.items.findIndex(
      appointment => appointment.staff_id === staffId
    );

    return this.items[index] as unknown as Appointment[];
  }

  async findByUser(userId: string): Promise<Appointment> {
    const index = this.items.findIndex(
      appointment => appointment.user_id === userId
    );

    return this.items[index];
  }

  async findById(id: string): Promise<Appointment> {
    const index = this.items.findIndex(appointment => appointment.id === id);

    return this.items[index];
  }

  async deleteById(id: string): Promise<void> {
    const index = this.items.findIndex(appointment => appointment.id === id);
    delete this.items[index];
  }
}
