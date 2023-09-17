import { Controller } from '@core/infra/Controller';
import { PrismaConnectionsRepository } from '@modules/http/accounts/repositories/prisma/PrismaConnectionsRepository';
import { PrismaUserRepository } from '@modules/http/accounts/repositories/prisma/PrismaUserRepository';
// import { DiscordRestService } from '@modules/http/accounts/services/discord/DiscordRestService'
import { DiscordConnection } from '@modules/http/accounts/useCases/Connections/DiscordConnection/DiscordConnection';
import { DiscordConnectionController } from '@modules/http/accounts/useCases/Connections/DiscordConnection/DiscordConnectionController';

export function makeDiscordConnectionController(): Controller {
  const connectionsRepository = new PrismaConnectionsRepository();
  const repository = new PrismaUserRepository(null, connectionsRepository);
  const useCase = new DiscordConnection(repository, connectionsRepository);
  const controller = new DiscordConnectionController(useCase);

  return controller;
}
