import { Entity } from '@core/domain/Entity';
import { Profile } from '@prisma/client';

interface IVisitorProps {
  visitors_id: string;
  visitor_id: string;
  visitor?: Profile;
  at?: Date;
}

export class Visitor extends Entity<IVisitorProps> {
  get visitor_id() {
    return this.props.visitor_id;
  }

  get visitors_id() {
    return this.props.visitors_id;
  }

  get visitor() {
    return this.props.visitor;
  }

  get at() {
    return this.props.at;
  }

  private constructor(props: IVisitorProps, id?: string) {
    super(props, id);
  }

  static create(props: IVisitorProps, id?: string): Visitor {
    const visitor = new Visitor(props, id);

    return visitor;
  }
}
