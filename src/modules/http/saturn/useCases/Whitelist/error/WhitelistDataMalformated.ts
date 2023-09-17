import { DomainError } from '@core/domain/errors/DomainError';

export class WhitelistDataMalformated extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:USECASES:WHITELIST:WHITELIST_DATA_MALFORMATED`);
    this.name = 'WhitelistDataMalformated';
  }
}
