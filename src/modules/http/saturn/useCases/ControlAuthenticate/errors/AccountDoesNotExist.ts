import { DomainError } from '@core/domain/errors/DomainError';

export class AccountDoesNotExist extends Error implements DomainError {
  constructor() {
    super(
      `CORE:ACCOUNTS:USECASES:COTNROL:CONTROL_AUTHENTICATE_USER:ACCOUNT_DOES_NOT_EXIST`
    );
    this.name = 'AccountDoesNotExist';
  }
}
