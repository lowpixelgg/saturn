import { DomainError } from '@core/domain/errors/DomainError';
import { ValidationError } from '@infra/http/errors';

export class PostContentInvalidLength extends Error implements DomainError {
  constructor() {
    super(`CORE:SOCIAL:DOMAIN:TIMELINE:ERROS:POST_CONTENT_INVALID_LENGTH`);
    this.name = 'PostContentInvalidLength';
  }
}
