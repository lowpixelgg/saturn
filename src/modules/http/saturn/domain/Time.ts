import { Entity } from '@core/domain/Entity';
import { Staff } from '@prisma/client';

interface ITimeProps {
  date: string;
  scheduled?: boolean;
  staff?: Staff;
  staff_id?: string;
}

export class Time extends Entity<ITimeProps> {
  get date() {
    return this.props.date;
  }

  get staff_id() {
    return this.props.staff_id;
  }

  get scheduled() {
    return this.props.scheduled;
  }

  get staff() {
    return this.props.staff;
  }

  set setScheduled(state: boolean) {
    this.props.scheduled = state;
  }

  private constructor(props: ITimeProps, id?: string) {
    super(props, id);
  }

  static create(props: ITimeProps, id?: string): Time {
    const time = new Time(props, id);

    return time;
  }
}
