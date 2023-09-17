import { DomainError } from '@core/domain/errors/DomainError';

export class InvalidPostContentLength extends Error implements DomainError {
  constructor() {
    super(
      `CORE:SOCIAL:USECASES:CREATE_POST:ERRORS:INVALID_POST_CONTENT_LENGTH`
    );
    this.name = 'InvalidPostContentLength';
  }
}
