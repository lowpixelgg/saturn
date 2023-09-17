import { DomainError } from '@core/domain/errors/DomainError';

export class RecoveryNotFound extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:SERVICES:ERROS:RECOVERY_NOT_FOUND`);
    this.name = 'RecoveryNotFound';
  }
}
