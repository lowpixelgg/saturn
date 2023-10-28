import {
  Profile,
  User as PersistenceUser,
  Notification as PersistenceNotification,
  Connection as PersistencecConnection,
  Staff,
  Appointments,
} from '@prisma/client';
import { Password } from '@modules/http/accounts/domain/user/Password';
import { Name } from '@modules/http/accounts/domain/user/Username';
import { Email } from '@modules/http/accounts/domain/user/Email';
import { User } from '@modules/http/accounts/domain/user/user';
import { UserDetails } from '../dtos/UserDetails';
import { Notifications } from '../domain/user/Notifications';
import { NotificationMapper } from './NotificationMappert';
import { Connections } from '../domain/user/Connections';
import { Connection } from '../domain/user/Connection';
import { Appointment } from '@modules/http/player/domain/Appointment';

type PersistenceUserRaw = PersistenceUser & {
  Connections?: PersistencecConnection[];
  notifications?: PersistenceNotification[];
  Profile: Profile;
  appointment?: Appointments;
  Staff: Staff;
};

export class UserMapper {
  static toDomain(raw: PersistenceUserRaw): User {
    const nameOrError = Name.create(raw.username);
    const emailOrError = Email.create(raw.email);
    const passwordOrError = Password.create(raw.password, true);

    const notificationsErr = raw.notifications
      ? Notifications.create(
          raw.notifications.map(notifictation =>
            NotificationMapper.toDomain(notifictation)
          )
        )
      : Notifications.create([]);

    const connectionsOrErr = raw.Connections
      ? Connections.create(
          raw.Connections.map(connection => Connection.create(connection))
        )
      : Connections.create([]);

    if (nameOrError.isLeft()) {
      throw new Error('Name value is invalid.');
    }

    if (emailOrError.isLeft()) {
      throw new Error('Email value is invalid.');
    }

    if (passwordOrError.isLeft()) {
      throw new Error('Password value is invalid.');
    }

    const userOrError = User.create(
      {
        username: nameOrError.value,
        email: emailOrError.value,
        password: passwordOrError.value,
        features: raw.features,
        Profile: raw.Profile,
        auth_system: raw.auth_system,
        isPremium: raw.isPremium,
        isVerified: raw.isVerified,
        notifications: notificationsErr,
        staff: raw.Staff,
        appointment: raw.appointment,
        timeout: raw.timeout,
        role: raw.role,
        connections: connectionsOrErr,
        status: raw.status,
      },
      raw.id
    );

    if (userOrError.isRight()) {
      return userOrError.value;
    }

    return null;
  }

  static toDto(raw: PersistenceUserRaw): UserDetails {
    return {
      id: raw.id,
      email: raw.email,
      username: raw.username,
      role: raw.role,
      isPremium: raw.isPremium,
      isVerified: raw.isVerified,
      features: raw.features,
      status: raw.status,
      auth_system: raw.auth_system,
      timeout: raw.timeout,
      createdAt: raw.createdAt,
    };
  }

  static async toPersistence(user: User) {
    return {
      id: user.id,
      email: user.email.value,
      username: user.username.value,
      password: await user.password.getHashedValue(),
      features: user.features,
      auth_system: user.auth_system,
      status: user.status,
      timeout: user.timeout,
    };
  }
}
