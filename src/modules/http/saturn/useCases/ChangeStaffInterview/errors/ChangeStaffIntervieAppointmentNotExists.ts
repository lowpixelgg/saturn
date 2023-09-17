import { DomainError } from '@core/domain/errors/DomainError';

export class ChangeStaffIntervieAppointmentNotExists
  extends Error
  implements DomainError
{
  constructor() {
    super(
      `CORE:ACCOUNTS:USECASES:COTNROL:CHANGE_STAFF_INTERVIEW:CHANGE_STAFF_INTERVIEW_APPOINTMENT_NOT_EXISTS`
    );
    this.name = 'ChangeStaffInteriviewNotExists';
  }
}
