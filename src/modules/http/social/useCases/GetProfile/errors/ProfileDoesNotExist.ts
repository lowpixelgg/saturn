import { DomainError } from '@core/domain/errors/DomainError';

export class ProfileDoesNotExist extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:SERVICES:ERROS:PROFILE_DOES_NOT_EXIST`);
    this.name = 'ProfileDoesNotExist';
  }
}
