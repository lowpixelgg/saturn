import { Entity } from '@core/domain/Entity';
import { User } from '@prisma/client';
import { Time } from './Time';
import { Times } from './Times';

interface IStaffProps {
  user_id: string;
  user?: User;
  times?: Times;
  access_level: string;
  updated_at: string;
}

export class Staff extends Entity<IStaffProps> {
  get user_id() {
    return this.props.user_id;
  }

  get user() {
    return this.props.user;
  }

  get times() {
    return this.props.times;
  }

  get access_level() {
    return this.props.access_level;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  public WeekOut(time: Time) {
    this.times.add(time);
  }

  private constructor(props: IStaffProps, id?: string) {
    super(props, id);
  }

  static create(props: IStaffProps, id?: string): Staff {
    const staff = new Staff(
      {
        ...props,
        times: props.times ?? Times.create([]),
      },
      id
    );

    return staff;
  }
}
