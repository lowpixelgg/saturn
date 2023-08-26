import { Notification as PersistenceNotification } from '@prisma/client'
import { Notification } from '../domain/user/Notification'

export class NotificationMapper {
  static toDomain(raw: PersistenceNotification) {
    const notify = Notification.create(
      {
        read: raw.read,
        small: raw.small,
        content: raw.content,
        title: raw.title,
        userid: raw.userid,
      },
      raw.id
    )

    return notify
  }

  static toPersistence(raw: Notification) {
    return {
      id: raw.id,
      read: raw.read,
      small: raw.small,
      content: raw.content,
      title: raw.title,
      userid: raw.userid,
    }
  }
}
