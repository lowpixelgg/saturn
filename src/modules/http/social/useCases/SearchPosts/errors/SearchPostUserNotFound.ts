import { DomainError } from '@core/domain/errors/DomainError';

export class SearchPostUserNotFound extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:SERVICES:ERROS:SEARCH_POST_USER_NOT_FOUND`);
    this.name = 'SearchPostUserNotFound';
  }
}
