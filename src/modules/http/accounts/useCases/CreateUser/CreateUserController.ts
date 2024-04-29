import { Controller } from '@core/infra/Controller';
import {
  HttpResponse,
  clientError,
  conflict,
  created,
  fail,
} from '@core/infra/HttpResponse';

import { AccountAleardyExists } from '../RegisterUser/errors/AccountAleardyExists';
import { CreateUser } from './CreateUser';

export class CreateUserController implements Controller {
  constructor(private createUser: CreateUser) {}

  async handle(): Promise<HttpResponse> {
    try {

      const result = await this.createUser.execute();

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case AccountAleardyExists:
            return conflict(error);
          default:
            return clientError(error);
        }
      } else {
        return created();
      }
    } catch (err) {
      return fail(err);
    }
  }
}
