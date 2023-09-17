import { DomainError } from '@core/domain/errors/DomainError';

export class RecoveryTokenNotValid extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:SERVICES:ERROS:RECOVERY_TOKEN_NOT_VALID`);
    this.name = 'RecoveryTokenNotValid';
  }
}
