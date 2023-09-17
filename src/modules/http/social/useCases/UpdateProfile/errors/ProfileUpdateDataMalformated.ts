import { DomainError } from '@core/domain/errors/DomainError';

export class ProfileUpdateDataMalformated extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:SERVICES:ERROS:PROFILE_UPDATE_DATA_MALFORMATED`);
    this.name = 'ProfileUpdateDataMalformated';
  }
}
