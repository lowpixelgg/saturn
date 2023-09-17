import { DomainError } from '@core/domain/errors/DomainError';

export class ProfileUpdateActionRequired extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:SERVICES:ERROS:PROFILE_UPDATE_ACTION_REQUIRED`);
    this.name = 'ProfileUpdateActionRequired';
  }
}
