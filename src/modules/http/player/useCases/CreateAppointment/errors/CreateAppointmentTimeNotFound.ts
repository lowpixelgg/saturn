import { DomainError } from '@core/domain/errors/DomainError';

export class CreateAppointmentTimeNotFound
  extends Error
  implements DomainError
{
  constructor() {
    super(
      `CORE:PLAYER:USECASES:CREATE_APPOINTMENT:ERRORS:CREATE_APPOINTMENT_TIME_NOT_FOUND`
    );
    this.name = 'CreateAppointmentTimeNotFound';
  }
}
