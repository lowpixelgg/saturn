import { DomainError } from '@core/domain/errors/DomainError';

export class AccountInvalidPassword extends Error implements DomainError {
  constructor() {
    super(
      `CORE:ACCOUNTS:USECASES:CONTROL:CONTROL_AUTHENTICATE:ACCOUNT_INVALID_PASSWORD`
    );
    this.name = 'AccountInvalidPassword';
  }
}
