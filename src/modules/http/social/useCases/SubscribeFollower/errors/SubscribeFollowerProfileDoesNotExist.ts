import { DomainError } from '@core/domain/errors/DomainError';

export class SubscribeFollowerProfileDoesNotExist
  extends Error
  implements DomainError
{
  constructor() {
    super(
      `CORE:ACCOUNTS:SERVICES:ERROS:SUBSCRIBE_FOLLOWER_PROFILE_DOES_NOT_EXIST`
    );
    this.name = 'SubscribeFollowerProfileDoesNotExist';
  }
}
