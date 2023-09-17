import { Entity } from '@core/domain/Entity';

interface IAppointmentsProps {
  staff_id: string;
  user_id: string;
  date: number;
  status?: string;
  channelId?: string;
  name: string;
  observation?: string;
}

export class Appointment extends Entity<IAppointmentsProps> {
  get staff_id() {
    return this.props.staff_id;
  }

  get user_id() {
    return this.props.user_id;
  }

  get name() {
    return this.props.name;
  }

  get date() {
    return this.props.date;
  }

  get status() {
    return this.props.status;
  }

  get channelId() {
    return this.props.channelId;
  }

  get observation() {
    return this.props.observation;
  }

  set setAppointmentStatus(status: string) {
    this.props.status = status;
  }

  set setStaff(staffId: string) {
    this.props.staff_id = staffId;
  }

  set setChannelId(channelId: string) {
    this.props.channelId = channelId;
  }

  set setDate(date: any) {
    this.props.date = date;
  }

  private constructor(props: IAppointmentsProps, id?: string) {
    super(props, id);
  }

  static create(props: IAppointmentsProps, id?: string): Appointment {
    const appointment = new Appointment(
      {
        ...props,
        status: props.status ?? 'WAITING',
        channelId: props.channelId ?? null,
        observation: props.observation ?? '',
      },
      id
    );

    return appointment;
  }
}
