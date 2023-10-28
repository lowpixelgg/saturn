import { Either, left, right } from '@core/logic/Either';
import { AttachmentNotFound } from './errors/AttachmentNotFound';
import GoogleStorage from '@infra/services/gcs/GoogleStorage';
import { MissingArguments } from './errors/MissingArguments';

type DeleteAttachmentRequest = {
  key: string;
};

type DeleteAttachmentResponse = Either<
  AttachmentNotFound | MissingArguments,
  DeleteAttachmentRequest
>;

export class DeleteAttachment {
  constructor() {}

  async execute({
    key,
  }: DeleteAttachmentRequest): Promise<DeleteAttachmentResponse> {
    if (!key) {
      return left(new MissingArguments());
    }

    try {
      await GoogleStorage.delete(key);

      return right({ key });
    } catch (error) {
      return left(new AttachmentNotFound());
    }
  }
}
