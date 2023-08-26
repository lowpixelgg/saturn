import { Entity } from '@core/domain/Entity'
import { User } from '@prisma/client'

interface INotificationProps {
  read: boolean
  title?: string
  content?: string
  small: string
  user?: User
  userid?: string
}

export class Notification extends Entity<INotificationProps> {
  get small() {
    return this.props.small
  }

  get read() {
    return this.props.read
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get userid() {
    return this.props.userid
  }

  set markAsRead(read: boolean) {
    this.props.read = read
  }

  private constructor(props: INotificationProps, id?: string) {
    super(props, id)
  }

  static create(props: INotificationProps, id?: string): Notification {
    const answer = new Notification(props, id)
    return answer
  }
}
