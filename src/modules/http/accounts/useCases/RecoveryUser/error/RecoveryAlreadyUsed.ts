import { DomainError } from '@core/domain/errors/DomainError'

export class RecoveryAlreadyUsed extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:SERVICES:ERROS:RECOVERY_ALREADY_USED`)
    this.name = 'RecoveryAlreadyUsed'
  }
}
