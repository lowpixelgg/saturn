import { DomainError } from '@core/domain/errors/DomainError';

export class AccountDoesNotHavePermission extends Error implements DomainError {
  constructor() {
    super(
      `CORE:ACCOUNTS:USECASES:COTNROL:CONTROL_AUTHENTICATE_USER:ACCOUNT_DOES_NOT_HAVE_PERMISSION`
    );
    this.name = 'AccountDoesNotHavePermission';
  }
}
