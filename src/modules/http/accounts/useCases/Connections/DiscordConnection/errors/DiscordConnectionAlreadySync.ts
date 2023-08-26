import { DomainError } from '@core/domain/errors/DomainError'

export class DiscordConnectionAlreadySync extends Error implements DomainError {
  constructor() {
    super(
      `CORE:ACCOUNTS:USECASES:CONNECTIONS:DISCORD_CONNECTION:DISCORD_CONNECTION_ALREADY_SYNC`
    )
    this.name = 'DiscordConnectionAlreadySync'
  }
}
