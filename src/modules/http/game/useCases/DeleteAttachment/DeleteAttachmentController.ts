import { Controller } from '@core/infra/Controller';
import { DeleteAttachment } from './DeleteAttachment';
import { HttpResponse, clientError, fail, ok } from '@core/infra/HttpResponse';
import { MissingArguments } from './errors/MissingArguments';
import { AttachmentNotFound } from './errors/AttachmentNotFound';

type DeleteAttachmentRequest = {
  key: string;
};

export class DeleteAttachmentController implements Controller {
  constructor(private deleteAttachment: DeleteAttachment) {}

  async handle({ key }: DeleteAttachmentRequest): Promise<HttpResponse> {
    const result = await this.deleteAttachment.execute({ key });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case MissingArguments:
          return clientError(error);
        case AttachmentNotFound:
          return clientError(error);
        default:
          return fail(error);
      }
    } else {
      return ok();
    }
  }
}
