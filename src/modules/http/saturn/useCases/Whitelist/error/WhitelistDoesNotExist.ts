import { DomainError } from '@core/domain/errors/DomainError';

export class WhitelistDoesNotExist extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:USECASES:WHITELIST:WHITELIST_DOES_NOT_EXIST`);
    this.name = 'WhitelistDoesNotExist';
  }
}
