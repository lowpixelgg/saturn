import { DomainError } from '@core/domain/errors/DomainError';

export class MissingArguments extends Error implements DomainError {
  constructor() {
    super(`CORE:GAME:USECASES:DELETE_ATTACHMENT:ERRORS:MISSING_ARGUMENTS`);
    this.name = 'MissingArguments';
  }
}
