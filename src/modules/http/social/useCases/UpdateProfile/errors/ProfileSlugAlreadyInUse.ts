import { DomainError } from '@core/domain/errors/DomainError';

export class ProfileSlugAlreadyInUse extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:SERVICES:ERROS:PROFILE_SLUG_ALREADY_INUSE`);
    this.name = 'ProfileSlugAlreadyInUse';
  }
}
