import { DomainError } from '@core/domain/errors/DomainError';

export class AccountAleardyExists extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:USECASES:REGISTER:REGISTER_USE_CASE`);
    this.name = 'AccountAleardyExists';
  }
}
