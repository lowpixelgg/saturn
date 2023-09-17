import { DomainError } from '@core/domain/errors/DomainError';

export class ContentAvatarError extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:USECASES:CONTENT:CONTENT_AVATAR:CONTENT_AVATAR_ERROR`);
    this.name = 'ContentAvatarError';
  }
}
