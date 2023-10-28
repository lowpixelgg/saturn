import { Controller } from '@core/infra/Controller';
import { PrismaUpdatesRepository } from '@modules/http/game/repositories/prisma/PrismaUpdatesRepository';
import { Attachments } from '@modules/http/game/useCases/Attachments/Attachments';
import { AttachmentsController } from '@modules/http/game/useCases/Attachments/AttachmentsController';
import { DeleteAttachment } from '@modules/http/game/useCases/DeleteAttachment/DeleteAttachment';
import { DeleteAttachmentController } from '@modules/http/game/useCases/DeleteAttachment/DeleteAttachmentController';
import { GetUpdatesPerDate } from '@modules/http/game/useCases/GetUpdatesPeerDate/GetUpdatesPerDate';
import { GetUpdatesPerDateController } from '@modules/http/game/useCases/GetUpdatesPeerDate/GetUpdatesPerDateController';

export function makeDeleteAttachmentController(): Controller {
  const useCase = new DeleteAttachment();
  const controller = new DeleteAttachmentController(useCase);

  return controller;
}
