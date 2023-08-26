import { DomainError } from '@core/domain/errors/DomainError'

export class NotificationNotExists extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:USECASES:NOTIFICATION_NOT_EXISTS`)
    this.name = 'NotificationNotExists'
  }
}
