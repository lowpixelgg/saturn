import { DomainError } from '@core/domain/errors/DomainError';

export class IsTooLarge extends Error implements DomainError {
  constructor() {
    super(`CORE:GAME:USECASES:ATTACHMENTS:ERRORS:IS_TOO_LARGE`);
    this.name = 'IsTooLarge';
  }
}
