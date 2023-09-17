import { DomainError } from '@core/domain/errors/DomainError';

export class ContentUserNotExist extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:USECASES:CONTENT:CONTENT:CONTENT_USER_NOT_EXIST`);
    this.name = 'ContentUserNotExist';
  }
}
