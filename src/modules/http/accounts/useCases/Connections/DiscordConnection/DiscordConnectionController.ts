import { Controller } from '@core/infra/Controller';
import {
  clientError,
  conflict,
  fail,
  forbidden,
  HttpResponse,
  notFound,
  ok,
} from '@core/infra/HttpResponse';
import { DiscordConnection } from './DiscordConnection';
import { DiscordConnectionAccountNotFound } from './errors/DiscordConnectionAccountNotFound';
import { DiscordConnectionAlreadySync } from './errors/DiscordConnectionAlreadySync';
import { DiscordConnectionNotAvailable } from './errors/DiscordConnectionNotAvailable';
import { DiscordConnectionRequestError } from './errors/DiscordConnectionRequestError';

type DiscordConnectionRequest = {
  code: string;
  user: { id: string };
};

export class DiscordConnectionController implements Controller {
  constructor(private discordConnection: DiscordConnection) {}

  async handle({
    code,
    user,
  }: DiscordConnectionRequest): Promise<HttpResponse> {
    const result = await this.discordConnection.execute({
      code,
      user,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case DiscordConnectionRequestError:
          return clientError(error);
        case DiscordConnectionAlreadySync:
          return conflict(error);
        case DiscordConnectionAccountNotFound:
          return notFound(error);
        case DiscordConnectionNotAvailable:
          return forbidden(error);
        default:
          return fail(error);
      }
    } else {
      return ok();
    }
  }
}
