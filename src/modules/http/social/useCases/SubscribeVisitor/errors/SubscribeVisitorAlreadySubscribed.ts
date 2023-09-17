import { DomainError } from '@core/domain/errors/DomainError';

export class SubscribeVisitorAlreadySubscribed
  extends Error
  implements DomainError
{
  constructor() {
    super(`CORE:ACCOUNTS:SERVICES:ERROS:SUBSCRIBE_VISITOR_ALREADY_SUBSCRIBED`);
    this.name = 'SubscribeVisitorAlreadySubscribed';
  }
}
