import { Entity } from '@core/domain/Entity';

interface ICommentProps {
  postId: string;
  authorId: string;
  content: string;
  createdAt?: Date;
}

export class Comment extends Entity<ICommentProps> {
  get postId() {
    return this.props.postId;
  }

  get authorId() {
    return this.props.authorId;
  }

  get content() {
    return this.props.content;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  private constructor(props: ICommentProps, id?: string) {
    super(props, id);
  }

  static create(props: ICommentProps, id?: string): Comment {
    const comment = new Comment(props, id);
    return comment;
  }
}
