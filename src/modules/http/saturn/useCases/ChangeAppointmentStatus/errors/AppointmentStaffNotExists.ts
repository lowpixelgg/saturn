import { DomainError } from '@core/domain/errors/DomainError';

export class AppointmentStaffNotExists extends Error implements DomainError {
  constructor() {
    super(
      `CORE:PLAYER:USECASES:CHECK_IN_APPOINTMENT:ERRORS:APPOINTMENT_STAFF_NOT_EXISTS`
    );
    this.name = 'AppointmentStaffNotExists';
  }
}
