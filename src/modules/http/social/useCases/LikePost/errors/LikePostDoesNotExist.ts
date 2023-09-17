import { DomainError } from '@core/domain/errors/DomainError';

export class LikePostDoesNotExist extends Error implements DomainError {
  constructor() {
    super(`CORE:SOCIAL:USECASES:LIKEPOST:ERROS:LIKE_POST_DOES_NOT_EXIST`);
    this.name = 'LikePostDoesNotExist';
  }
}
