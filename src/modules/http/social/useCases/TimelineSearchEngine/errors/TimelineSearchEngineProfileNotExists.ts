import { DomainError } from '@core/domain/errors/DomainError';

export class TimelineSearchEngineProfileNotExists
  extends Error
  implements DomainError
{
  constructor() {
    super(
      `CORE:SOCIAL:USECASES:TIMELINESEARCHENGINE:ERROS:TIMELINE_SEARCH_ENGINE_PROFILE_NOT_EXISTS`
    );
    this.name = 'TimelineSearchEngineProfileNotExists';
  }
}
