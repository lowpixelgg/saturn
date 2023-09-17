import { DomainError } from '@core/domain/errors/DomainError';

export class DiscordConnectionRequestError
  extends Error
  implements DomainError
{
  constructor() {
    super(
      `CORE:ACCOUNTS:USECASES:CONNECTIONS:DISCORD_CONNECTION:DISCORD_CONNECTION_REQUEST_ERROR`
    );
    this.name = 'DiscordConnectionRequestError';
  }
}
