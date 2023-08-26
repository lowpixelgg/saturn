import { DomainError } from '@core/domain/errors/DomainError'

export class SocialGoogleInvalidRequest extends Error implements DomainError {
  constructor() {
    super(
      `CORE:ACCOUNTS:USECASES:SOCIAL_AUTHENTICATE:SOCIAL_GOOGLE_AUTHENTICATE:INVALID_REQUEST`
    )
    this.name = 'SocialGoogleInvalidRequest'
  }
}
