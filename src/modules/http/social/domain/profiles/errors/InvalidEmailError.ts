import { DomainError } from '@core/domain/errors/DomainError';
import { ValidationError } from '@infra/http/errors';

export class InvalidEmailError extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:DOMAIN:USER:ERROS:CREATE_EMAIL`);
    this.name = 'InvalidEmailError';
  }
}
