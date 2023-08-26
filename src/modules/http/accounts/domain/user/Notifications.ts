import { WatchedList } from '@core/domain/WatchedList'

import { Notification } from './Notification'

export class Notifications extends WatchedList<Notification> {
  private constructor(notifications: Notification[]) {
    super(notifications)
  }

  public compareItems(a: Notification, b: Notification): boolean {
    return a.equals(b)
  }

  public static create(notifications?: Notification[]): Notifications {
    return new Notifications(notifications || [])
  }
}
