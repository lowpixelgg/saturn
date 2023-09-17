import { DomainError } from '@core/domain/errors/DomainError';

export class CreateAppointmentConnError extends Error implements DomainError {
  constructor() {
    super(
      `CORE:PLAYER:USECASES:CREATE_APPOINTMENT:ERRORS:CREATE_APPOINTMENT_CONNECTION_ERROR`
    );
    this.name = 'CreateAppointmentConnError';
  }
}
