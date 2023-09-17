import { Controller } from '@core/infra/Controller';
import {
  clientError,
  conflict,
  HttpResponse,
  notFound,
  ok,
} from '@core/infra/HttpResponse';
import { ServiceTokenAlreadyUsed } from '@modules/http/accounts/useCases/ActivateUser/errors/ServiceTokenAlreadyUsed';
import { ServiceTokenExpired } from '@modules/http/accounts/useCases/ActivateUser/errors/ServiceTokenExpired';
import { ServiceTokenNotFound } from '@modules/http/accounts/useCases/ActivateUser/errors/ServiceTokenNotFound';
import { ServiceTokenNotValid } from '@modules/http/accounts/useCases/ActivateUser/errors/ServiceTokenNotValid';
import { ChangeStaffInterview } from './ChangeStaffInterview';
import { ChangeStaffInteriviewStaffNotExists } from './errors/ChangeStaffInteriviewStaffNotExists';
import { ChangeStaffIntervieAppointmentNotExists } from './errors/ChangeStaffIntervieAppointmentNotExists';

type ChangeStaffInterviewControllerRequest = {
  user: { id: string };
  tokenId: string;
  appointmentId: string;
};

export class ChangeStaffInterviewController implements Controller {
  constructor(private changeStaffInterview: ChangeStaffInterview) {}

  async handle({
    appointmentId,
    tokenId,
    user,
  }: ChangeStaffInterviewControllerRequest): Promise<HttpResponse> {
    const result = await this.changeStaffInterview.execute({
      appointmentId,
      tokenId,
      user,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ChangeStaffInteriviewStaffNotExists:
          return notFound(error);
        case ChangeStaffIntervieAppointmentNotExists:
          return notFound(error);
        case ServiceTokenAlreadyUsed:
          return conflict(error);
        case ServiceTokenNotFound:
          return notFound(error);
        case ServiceTokenExpired:
          return clientError(error);
        case ServiceTokenNotValid:
          return clientError(error);
        default:
          return clientError(error);
      }
    } else {
      return ok();
    }
  }
}
