import { DomainError } from '@core/domain/errors/DomainError';

export class InvalidPostUserNotFound extends Error implements DomainError {
  constructor() {
    super(
      `CORE:SOCIAL:USECASES:CREATE_POST:ERRORS:INVALID_POST_USER_NOT_FOUND`
    );
    this.name = 'InvalidPostUserNotFound';
  }
}
