import { DomainError } from '@core/domain/errors/DomainError'

export class GetProfileDoesNotExist extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:SERVICES:ERROS:GET_PROFILE_DOES_NOT_EXIST`)
    this.name = 'GetProfileDoesNotExist'
  }
}
