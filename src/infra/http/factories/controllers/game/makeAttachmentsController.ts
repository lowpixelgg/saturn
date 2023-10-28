import { Controller } from '@core/infra/Controller';
import { PrismaUpdatesRepository } from '@modules/http/game/repositories/prisma/PrismaUpdatesRepository';
import { Attachments } from '@modules/http/game/useCases/Attachments/Attachments';
import { AttachmentsController } from '@modules/http/game/useCases/Attachments/AttachmentsController';
import { GetUpdatesPerDate } from '@modules/http/game/useCases/GetUpdatesPeerDate/GetUpdatesPerDate';
import { GetUpdatesPerDateController } from '@modules/http/game/useCases/GetUpdatesPeerDate/GetUpdatesPerDateController';

export function makeAttachmentsController(): Controller {
  const useCase = new Attachments();
  const controller = new AttachmentsController(useCase);

  return controller;
}
