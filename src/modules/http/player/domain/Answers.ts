import { WatchedList } from '@core/domain/WatchedList'

import { Answer } from './Answer'

export class Answers extends WatchedList<Answer> {
  private constructor(answers: Answer[]) {
    super(answers)
  }

  public compareItems(a: Answer, b: Answer): boolean {
    return a.equals(b)
  }

  public static create(answers?: Answer[]): Answers {
    return new Answers(answers || [])
  }
}
