import { DomainError } from '@core/domain/errors/DomainError';

export class SubscribeFollowerDoesNotExist
  extends Error
  implements DomainError
{
  constructor() {
    super(`CORE:ACCOUNTS:SERVICES:ERROS:SUBSCRIBE_FOLLOWER_DOES_NOT_EXIST`);
    this.name = 'SubscribeFollowerDoesNotExist';
  }
}
