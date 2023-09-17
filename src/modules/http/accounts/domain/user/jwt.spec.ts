import { describe, it, expect } from 'vitest';
import { User } from '@modules/http/accounts/domain/user/user';
import { Email } from '@modules/http/accounts/domain/user/Email';
import { Password } from '@modules/http/accounts/domain/user/Password';
import { Name } from '@modules/http/accounts/domain/user/Username';
import { JWT } from './jwt';

const username = Name.create('Jhon Doe').value as Name;
const email = Email.create('jhondoe@gmail.com').value as Email;
const password = Password.create('123812378213').value as Password;

describe('JWT Test', () => {
  it('should be able to sign in', async () => {
    const userOrErr = User.create({
      username,
      email,
      password,
    });

    const user = userOrErr.value as User;
    const jwt = JWT.signUser(user);

    expect(jwt.token).toEqual(expect.any(String));
  });

  it('should be able to initialize JWT from another token', () => {
    const userOrErr = User.create({
      username,
      email,
      password,
      features: ['create:session'],
    }).value;

    const user = userOrErr as User;
    const created = JWT.signUser(user);

    const jwtOrErr = JWT.createFromJWT(created.token);
    const jwt = jwtOrErr.value as JWT;

    expect(jwt).toBeTypeOf('object');
  });
});
