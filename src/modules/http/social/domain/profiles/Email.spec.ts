import { expect, describe, it } from 'vitest';
import { Email } from './Email';

describe('Social model', () => {
  it('should be able to create a email', async () => {
    const nameOrErr = Email.create('jhon@doe.com');

    expect(nameOrErr.isRight()).toBeTruthy();
  });

  it('no shoud ble able to create a email', () => {
    const nameOrErr = Email.create('jhondoe.com');
    expect(nameOrErr.isLeft()).toBeTruthy();
  });
});
