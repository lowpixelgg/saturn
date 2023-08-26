import { Entity } from '@core/domain/Entity'
import { User } from '@prisma/client'
import { extend } from 'lodash'

interface IConnectionProps {
  plataform: string
  fallback: string
  user?: User
  user_id: string
}

export class Connection extends Entity<IConnectionProps> {
  get plataform() {
    return this.props.plataform
  }

  get fallback() {
    return this.props.fallback
  }

  get user_id() {
    return this.props.user_id
  }

  set updateFallback(updated: any) {
    this.props.fallback = updated
  }

  private constructor(props: IConnectionProps, id?: string) {
    super(props, id)
  }

  static create(props: IConnectionProps, id?: string): Connection {
    const connection = new Connection(props, id)

    return connection
  }
}
