import { DomainError } from '@core/domain/errors/DomainError'

export class AccountDoesNotExist extends Error implements DomainError {
  constructor() {
    super(
      `CORE:ACCOUNTS:USECASES:AUTHENTICATE:AUTHENTICATE_USER_CASE:ACCOUNT_DOES_NOT_EXIST`
    )
    this.name = 'AccountDoesNotExist'
  }
}
