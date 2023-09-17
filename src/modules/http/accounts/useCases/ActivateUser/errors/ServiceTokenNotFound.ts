import { DomainError } from '@core/domain/errors/DomainError';

export class ServiceTokenNotFound extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:SERVICES:ERROS:SERVICE_TOKEN_NOT_FOUND`);
    this.name = 'ServiceTokenNotFound';
  }
}
