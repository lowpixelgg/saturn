import { DomainError } from '@core/domain/errors/DomainError';
import { ValidationError } from '@infra/http/errors';

export class InvalidNameError extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:DOMAIN:USER:ERROS:CREATE_USERNAME`);
    this.name = 'InvalidNameError';
  }
}
