import { Controller } from '@core/infra/Controller';
import {
  clientError,
  conflict,
  fail,
  HttpResponse,
  notFound,
  ok,
} from '@core/infra/HttpResponse';
import { CreateAppointment } from './CreateAppointment';
import { CreateAppointmentTimeAlreadyInUse } from './errors/CreateAppointmentTimeAlreadyInUse';
import { CreateAppointmentUserNotFound } from './errors/CreateAppointmentUserNotFound';

type CreateAppointmentConnErrorRequest = {
  user: { id: string };
  timeId: string;
  name: string;
  observation: string;
};

export class CreateAppointmentConnError implements Controller {
  constructor(private createAppointment: CreateAppointment) {}

  async handle({
    user,
    timeId,
    name,
    observation,
  }: CreateAppointmentConnErrorRequest): Promise<HttpResponse> {
    const result = await this.createAppointment.execute({
      user,
      timeId,
      name,
      observation,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case CreateAppointmentUserNotFound:
          return notFound(error);
        case CreateAppointmentConnError:
          return clientError(error);
        case CreateAppointmentTimeAlreadyInUse:
          return conflict(error);
        default:
          return fail(error);
      }
    } else {
      return ok();
    }
  }
}
