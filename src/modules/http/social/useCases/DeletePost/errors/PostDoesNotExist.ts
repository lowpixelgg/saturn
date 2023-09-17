import { DomainError } from '@core/domain/errors/DomainError';

export class PostDoesNotExist extends Error implements DomainError {
  constructor() {
    super(`CORE:SOCIAL:USECASES:DELETEPOST:ERRORS:POST_DOES_NOT_EXIST`);
    this.name = 'PostDoesNotExist';
  }
}
