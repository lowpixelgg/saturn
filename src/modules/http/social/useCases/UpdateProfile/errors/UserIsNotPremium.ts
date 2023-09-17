import { DomainError } from '@core/domain/errors/DomainError';

export class UserIsNotPremium extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:SERVICES:ERROS:USER_IS_NOT_PREMIUM`);
    this.name = 'UserIsNotPremium';
  }
}
