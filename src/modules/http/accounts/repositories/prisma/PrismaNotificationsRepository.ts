import { Notification } from '@modules/http/accounts/domain/user/Notification'
import { Notifications } from '@modules/http/accounts/domain/user/Notifications'
import { NotificationMapper } from '@modules/http/accounts/mappers/NotificationMappert'
import { prisma } from '@infra/prisma/prisma-client'
import { INotificationsRepository } from '../INotificationsRepository'

export class PrismaNotificationsRepository implements INotificationsRepository {
  constructor() {}

  async exists(id: string): Promise<boolean> {
    const dbQuery = await prisma.notification.findUnique({
      where: { id },
    })

    return !!dbQuery
  }

  async markAsRead(id: string): Promise<void> {
    await prisma.notification.update({
      where: { id },
      data: {
        read: true,
      },
    })
  }

  async findById(id: string): Promise<Notification> {
    const dbQuery = await prisma.notification.findUnique({ where: { id } })
    return NotificationMapper.toDomain(dbQuery)
  }

  async save(notifications: Notifications): Promise<void> {
    if (notifications.getNewItems().length > 0) {
      const data = notifications
        .getNewItems()
        .map(notification => NotificationMapper.toPersistence(notification))

      await prisma.notification.createMany({
        data,
      })
    }

    if (notifications.getRemovedItems().length > 0) {
      const removeIds = notifications
        .getRemovedItems()
        .map(notification => notification.id)

      await prisma.notification.deleteMany({
        where: {
          id: {
            in: removeIds,
          },
        },
      })
    }
  }

  async create(notifications: Notifications): Promise<void> {
    const data = notifications
      .getNewItems()
      .map(notification => NotificationMapper.toPersistence(notification))

    await prisma.notification.createMany({ data })
  }

  async saveSingle(notification: Notification): Promise<void> {
    const data = NotificationMapper.toPersistence(notification)

    await prisma.notification.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
