import { DomainError } from '@core/domain/errors/DomainError'

export class CreateWeekTimeStaffNotFound extends Error implements DomainError {
  constructor() {
    super(
      `MODULES:HTTP:SATURN:USECASES:CREATE_WEEK_TIME:CREATE_WEEK_TIME_STAFF_NOT_FOUND`
    )
    this.name = 'CreateWeekTimeStaffNotFound'
  }
}
