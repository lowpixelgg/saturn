import { DomainError } from '@core/domain/errors/DomainError';

export class DiscordConnectionAccountNotFound
  extends Error
  implements DomainError
{
  constructor() {
    super(
      `CORE:ACCOUNTS:USECASES:CONNECTIONS:DISCORD_CONNECTION:DISCORD_CONNECTION_ACCOUNT_NOT_FOUND`
    );
    this.name = 'DiscordConnectionAccountNotFound';
  }
}
