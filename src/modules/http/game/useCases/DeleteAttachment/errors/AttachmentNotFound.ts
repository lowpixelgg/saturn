import { DomainError } from '@core/domain/errors/DomainError';

export class AttachmentNotFound extends Error implements DomainError {
  constructor() {
    super(`CORE:GAME:USECASES:DELETE_ATTACHMENT:ERRORS:ATTACHMENT_NOT_FOUND`);
    this.name = 'IsTooLarge';
  }
}
