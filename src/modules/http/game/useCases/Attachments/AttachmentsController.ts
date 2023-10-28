import { Controller } from '@core/infra/Controller';
import {
  HttpResponse,
  clientError,
  fail,
  ok,
  tooLarge,
} from '@core/infra/HttpResponse';
import { Attachments } from './Attachments';
import { IsTooLarge } from './errors/IsTooLarge';
import { MissingArguments } from './errors/MissingArguments';

type AttachmentControllerRequest = {
  file: Express.Multer.File | string;
  folder: string;
};

export class AttachmentsController implements Controller {
  constructor(private attachments: Attachments) {}

  async handle({
    file,
    folder,
  }: AttachmentControllerRequest): Promise<HttpResponse> {
    const result = await this.attachments.execute({ file, folder });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case IsTooLarge:
          return tooLarge(error);
        case MissingArguments:
          return clientError(error);
        default:
          return fail(error);
      }
    } else {
      return ok(result.value);
    }
  }
}
