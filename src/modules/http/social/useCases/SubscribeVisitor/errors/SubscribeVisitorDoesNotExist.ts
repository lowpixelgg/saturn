import { DomainError } from '@core/domain/errors/DomainError';

export class SubscribeVisitorDoesNotExist extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:SERVICES:ERROS:SUBSCRIBE_VISITOR_DOES_NOT_EXIST`);
    this.name = 'SubscribeVisitorDoesNotExist';
  }
}
