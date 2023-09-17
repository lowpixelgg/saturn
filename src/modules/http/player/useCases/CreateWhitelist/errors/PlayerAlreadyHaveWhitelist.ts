import { DomainError } from '@core/domain/errors/DomainError';

export class PlayerAlreadyHaveWhitelist extends Error implements DomainError {
  constructor() {
    super(
      `CORE:PLAYER:USECASES:CREATE_WHITELIST:ERRORS:PLAYER_ALREADY_WHITELIST`
    );
    this.name = 'PlayerAlreadyHaveWhitelist';
  }
}
