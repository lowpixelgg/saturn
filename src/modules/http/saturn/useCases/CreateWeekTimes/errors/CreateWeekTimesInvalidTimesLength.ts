import { DomainError } from '@core/domain/errors/DomainError'

export class CreateWeekTimesInvalidTimesLength
  extends Error
  implements DomainError
{
  constructor() {
    super(
      `MODULES:HTTP:SATURN:USECASES:CREATE_WEEK_TIME:CREATE_WEEK_TIKES_INVALID_TIMES_LENGTH`
    )
    this.name = 'CreateWeekTimesInvalidTimesLength'
  }
}
