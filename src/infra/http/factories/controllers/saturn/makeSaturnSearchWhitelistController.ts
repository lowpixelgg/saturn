import { PrismaWhitelistRepository } from '@modules/http/player/repositories/prisma/PrismaWhitelistRepository';
import { Controller } from '@core/infra/Controller';
import { SearchWhitelist } from '@modules/http/saturn/useCases/SearchWhitelist/SearchWhitelist';
import { SearchWhitelistController } from '@modules/http/saturn/useCases/SearchWhitelist/SearchWhitelistController';

export function makeSaturnSearchWhitelistController(): Controller {
  const repository = new PrismaWhitelistRepository();
  const useCase = new SearchWhitelist(repository);
  const controller = new SearchWhitelistController(useCase);

  return controller;
}
