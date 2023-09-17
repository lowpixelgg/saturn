import { DomainError } from '@core/domain/errors/DomainError';

export class GetStaffAppointmentStaffNotExists
  extends Error
  implements DomainError
{
  constructor() {
    super(
      `MODULES:HTTP:SATURN:USECASES:GET_STAFF_APPOINTMENTS:GET_STAFF_APPOINTMENTS_STAFF_NOT_EXISTS`
    );
    this.name = 'GetStaffAppointmentStaffNotExists';
  }
}
