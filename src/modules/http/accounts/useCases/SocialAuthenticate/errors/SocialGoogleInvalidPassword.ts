import { DomainError } from '@core/domain/errors/DomainError';

export class SocialGoogleInvalidPassword extends Error implements DomainError {
  constructor() {
    super(
      `CORE:ACCOUNTS:USECASES:SOCIAL_AUTHENTICATE:SOCIAL_GOOGLE_AUTHENTICATE:ACCOUNT_INVALID_PASSWORD`
    );
    this.name = 'SocialGoogleInvalidPassword';
  }
}
