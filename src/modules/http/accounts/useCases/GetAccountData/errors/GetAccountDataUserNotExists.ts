import { DomainError } from '@core/domain/errors/DomainError'

export class GetAccountDataUserNotExists extends Error implements DomainError {
  constructor() {
    super(
      `CORE:ACCOUNTS:USECASES:AUTHENTICATE:AUTHENTICATE_USER_CASE:GET_ACCOUNT_DATA_USER_NOT_EXISTS`
    )
    this.name = 'GetAccountDataUserNotExists'
  }
}
