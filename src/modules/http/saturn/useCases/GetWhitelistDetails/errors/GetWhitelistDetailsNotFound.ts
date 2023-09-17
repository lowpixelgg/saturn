import { DomainError } from '@core/domain/errors/DomainError';

export class GetWhitelistNotFound extends Error implements DomainError {
  constructor() {
    super(
      `CORE:ACCOUNTS:USECASES:COTNROL:GETWHITELISTDETAILS:GE_WHITELIST_NOT_FOUND`
    );
    this.name = 'AccountDoesNotExist';
  }
}
