import { DomainError } from '@core/domain/errors/DomainError';

export class DiscordConnectionNotAvailable
  extends Error
  implements DomainError
{
  constructor() {
    super(
      `CORE:ACCOUNTS:USECASES:CONNECTIONS:DISCORD_CONNECTION:DISCORD_CONNECTION_NOT_AVAILABLE`
    );
    this.name = 'DiscordConnectionNotAvailable';
  }
}
