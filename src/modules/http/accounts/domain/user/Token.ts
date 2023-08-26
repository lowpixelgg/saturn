import { Entity } from '@core/domain/Entity'
import dayjs from 'dayjs'

interface ITokenProps {
  used?: boolean
  type: string
  user_id: string
  expiresIn?: number
}

export class Token extends Entity<ITokenProps> {
  get used() {
    return this.props.used
  }

  get type() {
    return this.props.type
  }

  get userId() {
    return this.props.user_id
  }

  get expiresIn() {
    return this.props.expiresIn
  }

  set markHasUsed(used: boolean) {
    this.props.used = used
  }

  private constructor(props: ITokenProps, id?: string) {
    super(props, id)
  }

  static create(props: ITokenProps, id?: string): Token {
    const answer = new Token(
      {
        ...props,
        expiresIn: props.expiresIn ?? dayjs().add(10, 'minutes').unix(),
      },
      id
    )
    return answer
  }
}
