import { DomainError } from '@core/domain/errors/DomainError'

export class CreateWeekTimeInvalidRequest extends Error implements DomainError {
  constructor() {
    super(
      `MODULES:HTTP:SATURN:USECASES:CREATE_WEEK_TIME:CREATE_WEEK_TIME_INVALID_REQUEST`
    )
    this.name = 'CreateWeekTimeInvalidRequest'
  }
}
