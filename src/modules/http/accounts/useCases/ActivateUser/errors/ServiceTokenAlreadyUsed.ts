import { DomainError } from '@core/domain/errors/DomainError'

export class ServiceTokenAlreadyUsed extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:SERVICES:ERROS:SERVICE_TOKEN_ALREADY_USED`)
    this.name = 'ServiceTokenAlreadyUsed'
  }
}
