import { DomainError } from '@core/domain/errors/DomainError';

export class SubscribeVisitorProfileDoesNotExist
  extends Error
  implements DomainError
{
  constructor() {
    super(
      `CORE:ACCOUNTS:SERVICES:ERROS:SUBSCRIBE_VISITOR_PROFILE_DOES_NOT_EXIST`
    );
    this.name = 'SubscribeVisitorProfileDoesNotExist';
  }
}
