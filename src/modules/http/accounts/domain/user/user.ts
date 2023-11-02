import { Entity } from '@core/domain/Entity';
import { Either, right } from '@core/logic/Either';

import { Email } from '@modules/http/accounts/domain/user/Email';
import { Password } from '@modules/http/accounts/domain/user/Password';
import { Name } from '@modules/http/accounts/domain/user/Username';
import { InvalidEmailError } from '@modules/http/accounts/domain/user/errors/InvalidEmailError';
import { InvalidPasswordError } from '@modules/http/accounts/domain/user/errors/InvalidPasswordError';
import { InvalidNameError } from '@modules/http/accounts/domain/user/errors/InvalidNameError';
import { Profile, Staff, Appointments } from '@prisma/client';
import { Notifications } from './Notifications';
import { Notification } from './Notification';
import { Connection } from './Connection';
import { Connections } from './Connections';
import { Tokens } from './Tokens';
import { Token } from './Token';

interface IUserProps {
  username: Name;
  email: Email;
  password: Password;
  role?: string;
  features?: string[];
  Profile?: Profile;
  isPremium?: boolean;
  isEarlySupporter?: boolean;
  status?: string;
  staff?: Staff;
  appointment?: Appointments;
  auth_system?: string;
  connections?: Connections;
  notifications?: Notifications;
  tokens?: Tokens;
  timeout?: number;
  isVerified?: boolean;
}

export class User extends Entity<IUserProps> {
  get username() {
    return this.props.username;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get features() {
    return this.props.features;
  }

  get isPremium() {
    return this.props.isPremium;
  }

  get isEarlySupporter() {
    return this.props.isEarlySupporter;
  }

  get Profile() {
    return this.props.Profile;
  }

  get isVerified() {
    return this.props.isVerified;
  }

  get status() {
    return this.props.status;
  }

  get staff() {
    return this.props.staff;
  }

  get appointment() {
    return this.props.appointment;
  }

  get role() {
    return this.props.role;
  }

  get timeout() {
    return this.props.timeout;
  }

  get notifications() {
    return this.props.notifications;
  }

  get connections() {
    return this.props.connections;
  }

  get auth_system() {
    return this.props.auth_system;
  }

  get tokens() {
    return this.props.tokens;
  }

  set setAccountWhitelistTimeout(timeout: number) {
    this.props.timeout = timeout;
  }

  set setAccountWhitelistStatus(status: string) {
    this.props.status = status;
  }

  set setPassword(password: Password) {
    this.props.password = password;
  }

  public addNotification(notification: Notification) {
    this.notifications.add(notification);
  }

  public removeNotification(notification: Notification) {
    this.notifications.remove(notification);
  }

  public addFeatures(features: string[]) {
    features.map((feature, index) => {
      this.props.features.push(feature);
    });
  }

  public addConnection(connection: Connection) {
    this.connections.add(connection);
  }

  public removeConnection(connection: Connection) {
    this.connections.remove(connection);
  }

  public addToken(token: Token) {
    this.tokens.add(token);
  }

  public removeToken(token: Token) {
    this.tokens.remove(token);
  }

  public removeFeatures(toRemove: string[]) {
    const features = this.props.features;

    toRemove.forEach(feat => {
      features.splice(features.indexOf(feat), 1);
    });

    features.map((feature, index) => {
      this.props.features.push(feature);
    });
  }

  private constructor(props: IUserProps, id?: string) {
    super(props, id);
  }

  static create(
    props: IUserProps,
    id?: string
  ): Either<InvalidNameError | InvalidEmailError | InvalidPasswordError, User> {
    const user = new User(
      {
        ...props,
        notifications: props.notifications ?? Notifications.create([]),
        connections: props.connections ?? Connections.create([]),
        tokens: props.tokens ?? Tokens.create([]),
        auth_system: props.auth_system ?? 'NORMAL',
      },
      id
    );

    return right(user);
  }
}
