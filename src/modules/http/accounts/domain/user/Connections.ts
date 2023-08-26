import { WatchedList } from '@core/domain/WatchedList'
import { Connection } from './Connection'

export class Connections extends WatchedList<Connection> {
  private constructor(connections: Connection[]) {
    super(connections)
  }

  public compareItems(a: Connection, b: Connection): boolean {
    return a.equals(b)
  }

  public static create(connections?: Connection[]): Connections {
    return new Connections(connections || [])
  }
}
