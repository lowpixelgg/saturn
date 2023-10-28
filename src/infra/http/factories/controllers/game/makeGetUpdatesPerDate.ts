import { Controller } from '@core/infra/Controller';
import { PrismaUpdatesRepository } from '@modules/http/game/repositories/prisma/PrismaUpdatesRepository';
import { GetUpdatesPerDate } from '@modules/http/game/useCases/GetUpdatesPeerDate/GetUpdatesPerDate';
import { GetUpdatesPerDateController } from '@modules/http/game/useCases/GetUpdatesPeerDate/GetUpdatesPerDateController';

export function makeGetUpdatesPerDate(): Controller {
  const repository = new PrismaUpdatesRepository();
  const useCase = new GetUpdatesPerDate(repository);
  const controller = new GetUpdatesPerDateController(useCase);

  return controller;
}
