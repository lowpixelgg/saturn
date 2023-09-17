import { DomainError } from '@core/domain/errors/DomainError';

export class SendRecoveryUserNotFound extends Error implements DomainError {
  constructor() {
    super(
      `CORE:ACCOUNTS:USECASES:AUTHENTICATE:AUTHENTICATE_USER_CASE:SEND_RECOVERY_USER_NOT_FOUND`
    );
    this.name = 'SendRecoveryUserNotFound';
  }
}
