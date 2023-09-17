import { DomainError } from '@core/domain/errors/DomainError';

export class PlayerAccountDoesNotExist extends Error implements DomainError {
  constructor() {
    super(
      `CORE:PLAYER:USECASES:CREATE_WHITELIST:ERRORS:PLAYER_ACCOUNT_DOES_NOT_EXIST`
    );
    this.name = 'PlayerAccountDoesNotExist';
  }
}
