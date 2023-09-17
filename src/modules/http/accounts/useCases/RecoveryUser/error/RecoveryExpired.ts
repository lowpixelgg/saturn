import { DomainError } from '@core/domain/errors/DomainError';

export class RecoveryExpired extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:SERVICES:ERROS:RECOVERY_EXPIRED`);
    this.name = 'RecoveryExpired';
  }
}
