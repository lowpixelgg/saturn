import { DomainError } from '@core/domain/errors/DomainError';

export class PlayerAccountIsTimeouted extends Error implements DomainError {
  constructor() {
    super(
      `CORE:PLAYER:USECASES:CREATE_WHITELIST:ERRORS:PLAYER_ACCOUNT_IS_TIMEOUTED`
    );
    this.name = 'PlayerAccountIsTimeouted';
  }
}
