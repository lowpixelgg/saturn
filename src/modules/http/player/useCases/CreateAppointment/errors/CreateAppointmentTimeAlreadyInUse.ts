import { DomainError } from '@core/domain/errors/DomainError';

export class CreateAppointmentTimeAlreadyInUse
  extends Error
  implements DomainError
{
  constructor() {
    super(
      `CORE:PLAYER:USECASES:CREATE_APPOINTMENT:ERRORS:CREATE_APPOINTMENT_TIME_ALREADY_IN_USE`
    );
    this.name = 'CreateAppointmentTimeAlreadyInUse';
  }
}
