import { DomainError } from '@core/domain/errors/DomainError';

export class WhitelistCustomError extends Error implements DomainError {
  constructor(msg: any) {
    super(msg);
    this.name = 'WhitelistCustomError';
  }
}
