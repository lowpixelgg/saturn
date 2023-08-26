import { DomainError } from '@core/domain/errors/DomainError'

export class AccountInvalidPassword extends Error implements DomainError {
  constructor() {
    super(
      `CORE:ACCOUNTS:USECASES:AUTHENTICATE:AUTHENTICATE_USER_CASE:ACCOUNT_INVALID_PASSWORD`
    )
    this.name = 'AccountInvalidPassword'
  }
}
