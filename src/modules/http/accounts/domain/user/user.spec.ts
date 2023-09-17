import { describe, it, expect } from 'vitest';
import { Email } from './Email';
import { Password } from './Password';
import { User } from './user';
import { Name } from './Username';

describe('UserEntity', () => {
  it('should be able to create a new user', () => {
    const username = Name.create('JhonDoe').value as Name;
    const email = Email.create('jhon@doe.com').value as Email;
    const password = Password.create('123456').value as Password;

    const userOrError = User.create({
      username,
      email,
      password,
    });

    expect(userOrError.isRight()).toBeTruthy();
  });

  it('should ble able to create a new user with feature flags', () => {
    const username = Name.create('JhonDoe').value as Name;
    const email = Email.create('jhon@doe.com').value as Email;
    const password = Password.create('123456').value as Password;

    const userOrError = User.create({
      username,
      email,
      password,
      features: ['feature:flag'],
    });

    expect(userOrError.isRight()).toBeTruthy();
  });
});
