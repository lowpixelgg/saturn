import { DomainError } from '@core/domain/errors/DomainError';

export class SubscribeFollowerAlreadySubscribed
  extends Error
  implements DomainError
{
  constructor() {
    super(`CORE:ACCOUNTS:SERVICES:ERROS:SUBSCRIBE_FOLLOWER_ALREADY_SUBSCRIBED`);
    this.name = 'SubscribeFollowerAlreadySubscribed';
  }
}
