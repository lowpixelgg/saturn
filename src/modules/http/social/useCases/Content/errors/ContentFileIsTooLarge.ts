import { DomainError } from '@core/domain/errors/DomainError';

export class ContentFileIsTooLarge extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:USECASES:CONTENT:CONTENTS:CONTENT_FILE_IS_TOO_LARGE`);
    this.name = 'ContentFileIsTooLarge';
  }
}
