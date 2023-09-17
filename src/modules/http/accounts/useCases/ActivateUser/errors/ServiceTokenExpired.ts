import { DomainError } from '@core/domain/errors/DomainError';

export class ServiceTokenExpired extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:SERVICES:ERROS:SERVICE_TOKEN_EXPIRED`);
    this.name = 'ServiceTokenExpired';
  }
}
