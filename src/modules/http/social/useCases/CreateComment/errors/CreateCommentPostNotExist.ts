import { DomainError } from '@core/domain/errors/DomainError';

export class CommentCommentPostNotExist extends Error implements DomainError {
  constructor() {
    super(
      `CORE:SOCIAL:USECASES:CREATE_COMMENT:ERRORS:CREATE_COMMENT_POST_NOT_EXIST`
    );
    this.name = 'CommentCommentPostNotExist';
  }
}
