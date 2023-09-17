import { Entity } from '@core/domain/Entity';
import { Profile } from '@prisma/client';

type IFollowProps = {
  following_id: string;
  followers_id: string;
  following?: Profile;
};

export class Follow extends Entity<IFollowProps> {
  get following_id() {
    return this.props.following_id;
  }

  get followers_id() {
    return this.props.followers_id;
  }

  get following() {
    return this.props.following;
  }

  private constructor(props: IFollowProps, id?: string) {
    super(props, id);
  }

  static create(props: IFollowProps, id?: string): Follow {
    const visitor = new Follow(props, id);

    return visitor;
  }
}
