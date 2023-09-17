import { DomainError } from '@core/domain/errors/DomainError';

export class LikePostAlreadyLiked extends Error implements DomainError {
  constructor() {
    super(`CORE:SOCIAL:USECASES:LIKEPOST:ERROS:LIKE_POST_ALREADY_LIKED`);
    this.name = 'LikePostAlreadyLiked';
  }
}
