import { Controller } from '@core/infra/Controller';
import {
  clientError,
  conflict,
  HttpResponse,
  notFound,
  ok,
} from '@core/infra/HttpResponse';
import { NotificationAlreadyRead } from './erros/NotificationAlreadyRead';
import { NotificationNotExists } from './erros/NotificationNotExists';
import { MarkNotificationAsRead } from './MarkNotificationAsRead';

type MarkNotificationAsReadRequestController = {
  id: string;
};

export class MarkNotificationAsReadController implements Controller {
  constructor(private markNotificationAsRead: MarkNotificationAsRead) {}

  async handle({
    id,
  }: MarkNotificationAsReadRequestController): Promise<HttpResponse> {
    const result = await this.markNotificationAsRead.execute({ id });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case NotificationNotExists:
          return notFound(error);
        case NotificationAlreadyRead:
          return conflict(error);
        default:
          return clientError(error);
      }
    } else {
      return ok();
    }
  }
}
