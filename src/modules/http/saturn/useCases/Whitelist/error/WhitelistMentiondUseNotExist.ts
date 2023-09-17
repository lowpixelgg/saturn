import { DomainError } from '@core/domain/errors/DomainError';

export class WhitelistMentiondUseNotExist extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:USECASES:WHITELIST:WHITELIST_MENTION_USER_NOT_EXIST`);
    this.name = 'WhitelistMentiondUseNotExist';
  }
}
