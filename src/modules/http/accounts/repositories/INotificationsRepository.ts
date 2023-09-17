import { Notification } from '../domain/user/Notification';
import { Notifications } from '../domain/user/Notifications';

export interface INotificationsRepository {
  exists(id: string): Promise<boolean>;
  findById(id: string): Promise<Notification>;
  save(notifications: Notifications): Promise<void>;
  create(notifications: Notifications): Promise<void>;
  saveSingle(notification: Notification): Promise<void>;
}
