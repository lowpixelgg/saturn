import { DomainError } from '@core/domain/errors/DomainError';

export class AppointmentNotExists extends Error implements DomainError {
  constructor() {
    super(
      `CORE:PLAYER:USECASES:CHECK_IN_APPOINTMENT:ERRORS:APPOINTMENT_NOT_EXISTS`
    );
    this.name = 'AppointmentNotExists';
  }
}
