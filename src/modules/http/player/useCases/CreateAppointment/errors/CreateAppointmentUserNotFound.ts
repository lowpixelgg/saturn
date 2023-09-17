import { DomainError } from '@core/domain/errors/DomainError';

export class CreateAppointmentUserNotFound
  extends Error
  implements DomainError
{
  constructor() {
    super(
      `CORE:PLAYER:USECASES:CREATE_APPOINTMENT:ERRORS:CREATE_APPOINTMENT_USER_NOT_FOUND`
    );
    this.name = 'CreateAppointmentUserNotFound';
  }
}
