import { DomainError } from '@core/domain/errors/DomainError';

export class ServiceTokenNotValid extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:SERVICES:ERROS:SERVICE_TOKEN_NOT_VALID`);
    this.name = 'ServiceTokenNotValid';
  }
}
