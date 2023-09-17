import { DomainError } from '@core/domain/errors/DomainError';

export class InvalidJsonWebToken extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:DOMAIN:USER:ERROS:CREATE_TOKEN`);
    this.name = 'InvalidJsonWebToken';
  }
}
