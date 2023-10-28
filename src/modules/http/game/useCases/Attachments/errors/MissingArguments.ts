import { DomainError } from '@core/domain/errors/DomainError';

export class MissingArguments extends Error implements DomainError {
  constructor() {
    super(`CORE:GAME:USECASES:ATTACHMENTS:ERRORS:MISSING_ARGUMENTS`);
    this.name = 'MissingArguments';
  }
}
