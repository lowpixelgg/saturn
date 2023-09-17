import { DomainError } from '@core/domain/errors/DomainError';
import { ValidationError } from '@infra/http/errors';

export class ProcessDataMalformated extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:DOMAIN:USER:ERROS:PROCESS_DATA_MALFORMATED`);
    this.name = 'ProcessDataMalformated';
  }
}
