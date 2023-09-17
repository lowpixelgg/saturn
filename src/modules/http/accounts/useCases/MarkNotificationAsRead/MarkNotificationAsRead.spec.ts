import { Notification } from '@modules/http/accounts/domain/user/Notification';
import { InMemoryNotificationsRepository } from '@modules/http/accounts/repositories/in-memory/InMemoryNotificationsRepository';
import { InMemoryUserRepository } from '@modules/http/accounts/repositories/in-memory/inMemoryUserRepository';
import { PrismaNotificationsRepository } from '@modules/http/accounts/repositories/prisma/PrismaNotificationsRepository';
import { PrismaUserRepository } from '@modules/http/accounts/repositories/prisma/PrismaUserRepository';
import { createUser } from '@utils/tests/UserFactory';
import { beforeEach, describe, expect, it } from 'vitest';
import { MarkNotificationAsRead } from './MarkNotificationAsRead';

let usersRepository: InMemoryUserRepository;
let notifyReposiotry: InMemoryNotificationsRepository;
let markNotificationAsRead: MarkNotificationAsRead;

describe('Notify useCase', () => {
  beforeEach(async () => {
    notifyReposiotry = new InMemoryNotificationsRepository();
    usersRepository = new InMemoryUserRepository(notifyReposiotry);
    markNotificationAsRead = new MarkNotificationAsRead(notifyReposiotry);
  });

  it('should able to user mark notify as read', async () => {
    const user = createUser();

    await usersRepository.create(user);

    const notify = Notification.create({
      read: false,
      small: 'JhonDoe, its a notify',
      title: 'Hello people aqui é o afreim',
      userid: user.id,
    });

    const account = await usersRepository.findOne(user.id);

    account.addNotification(notify);

    usersRepository.save(account);

    const result = await markNotificationAsRead.execute({ id: notify.id });

    expect(result.isRight()).toBeTruthy();
  });
});
