import { DomainError } from '@core/domain/errors/DomainError'

export class NotificationAlreadyRead extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:USECASES:NOTIFICATION_ALREADY_READ`)
    this.name = 'NotificationAlreadyRead'
  }
}
