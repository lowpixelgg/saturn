import { Controller } from '@core/infra/Controller';
import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository';
import {
  clientError,
  fail,
  HttpResponse,
  notFound,
  ok,
} from '@core/infra/HttpResponse';
import { RecoveryPassword } from './RecoveryPassword';
import { RecoveryAlreadyUsed } from './error/RecoveryAlreadyUsed';
import { RecoveryNotFound } from './error/RecoveryNotFound';
import { RecoveryExpired } from './error/RecoveryExpired';
import { RecoveryTokenNotValid } from './error/RecoveryTokenNotValid';

type RecoveryPasswordRequest = {
  password: string;
  id: string;
};

export class RecoveryPasswordController implements Controller {
  constructor(private recoveryPassword: RecoveryPassword) {}

  async handle({
    password,
    id,
  }: RecoveryPasswordRequest): Promise<HttpResponse> {
    const result = await this.recoveryPassword.execute({ id, password });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case RecoveryAlreadyUsed:
          return clientError(error);
        case RecoveryNotFound:
          return notFound(error);
        case RecoveryExpired:
          return clientError(error);
        case RecoveryTokenNotValid:
          return clientError(error);
        default:
          return fail(error);
      }
    } else {
      return ok(result.value);
    }
  }
}
