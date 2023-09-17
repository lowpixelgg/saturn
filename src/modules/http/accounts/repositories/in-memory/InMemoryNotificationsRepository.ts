import { Notification } from '@modules/http/accounts/domain/user/Notification';
import { Notifications } from '@modules/http/accounts/domain/user/Notifications';
import { INotificationsRepository } from '../INotificationsRepository';

export class InMemoryNotificationsRepository
  implements INotificationsRepository
{
  private items: Notification[] = [];

  constructor() {}

  async exists(id: string): Promise<boolean> {
    const index = this.items.find(notification => notification.id === id);
    return !!index;
  }

  async markAsRead(id: string): Promise<void> {
    const index = this.items.findIndex(notification => notification.id === id);

    delete this.items[index];
  }

  async findById(id: string): Promise<Notification> {
    const index = this.items.findIndex(notification => notification.id === id);

    return this.items[index];
  }

  async save(notifications: Notifications): Promise<void> {
    this.items.push(...notifications.getNewItems());

    notifications.getRemovedItems().forEach(notification => {
      const notificationsIndex = this.items.findIndex(notificationsItem => {
        return notificationsItem.id === notification.id;
      });

      this.items.splice(notificationsIndex, 1);
    });
  }

  async create(notifications: Notifications): Promise<void> {
    this.items.push(...notifications.getItems());
  }

  async saveSingle(notification: Notification): Promise<void> {
    const index = this.items.findIndex(
      notification => notification.id === notification.id
    );
    this.items[index] = notification;
  }
}
