import { Entity } from '@core/domain/Entity'

interface ILikeProps {
  postId: string
  authorId: string
  createdAt?: Date
}

export class Like extends Entity<ILikeProps> {
  get postId() {
    return this.props.postId
  }

  get authorId() {
    return this.props.authorId
  }

  get at() {
    return this.props.createdAt
  }

  private constructor(props: ILikeProps, id?: string) {
    super(props, id)
  }

  static create(props: ILikeProps, id?: string) {
    const like = new Like(props, id)
    return like
  }
}
