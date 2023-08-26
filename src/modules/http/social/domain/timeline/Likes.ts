import { WatchedList } from '@core/domain/WatchedList'

import { Like } from './Like'

export class Likes extends WatchedList<Like> {
  private constructor(likes: Like[]) {
    super(likes)
  }

  public compareItems(a: Like, b: Like): boolean {
    return a.equals(b)
  }

  public static create(likes?: Like[]): Likes {
    return new Likes(likes || [])
  }
}
