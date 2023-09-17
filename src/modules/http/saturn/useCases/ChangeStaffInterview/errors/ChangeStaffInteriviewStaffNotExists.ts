import { DomainError } from '@core/domain/errors/DomainError';

export class ChangeStaffInteriviewStaffNotExists
  extends Error
  implements DomainError
{
  constructor() {
    super(
      `CORE:ACCOUNTS:USECASES:COTNROL:CHANGE_STAFF_INTERVIEW:CHANGE_STAFF_INTERVIEW_STAFF_NOT_EXISTS`
    );
    this.name = 'ChangeStaffInteriviewStaffNotExists';
  }
}
