import { DomainError } from '@core/domain/errors/DomainError';

export class ProfileUpdateUserNotFound extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:SERVICES:ERROS:PROFILE_UPDATE_USER_NOT_FOUND`);
    this.name = 'ProfileUpdateUserNotFound';
  }
}
