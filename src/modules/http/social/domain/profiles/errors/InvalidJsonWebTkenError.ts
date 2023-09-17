import { DomainError } from '@core/domain/errors/DomainError';

export class InvalidEmailError extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:DOMAIN:USER:ERROS:CREATE_TOKEN`);
    this.name = 'InvalidEmailError';
  }
}
