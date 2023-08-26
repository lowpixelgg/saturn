import { WatchedList } from '@core/domain/WatchedList'
import { Time } from './Time'

export class Times extends WatchedList<Time> {
  private constructor(times: Time[]) {
    super(times)
  }

  public compareItems(a: Time, b: Time): boolean {
    return a.equals(b)
  }

  public static create(times?: Time[]): Times {
    return new Times(times || [])
  }
}
