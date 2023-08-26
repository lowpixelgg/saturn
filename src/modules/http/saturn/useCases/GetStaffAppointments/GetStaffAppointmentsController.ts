import { Controller } from '@core/infra/Controller'
import {
  clientError,
  HttpResponse,
  notFound,
  ok,
} from '@core/infra/HttpResponse'
import { Appointment } from '@modules/http/player/domain/Appointment'
import { AppointmentMapper } from '@modules/http/player/mappers/AppointmentMapper'
import { GetStaffAppointmentStaffNotExists } from './errors/GetStaffAppointmentStaffNotExists'
import { GetStaffAppointment } from './GetStaffAppointments'

type GetStaffAppointmentControllerRequest = {
  user: { id: string }
}

export class GetStaffAppointmentsController implements Controller {
  constructor(private getStaffAppointments: GetStaffAppointment) {}

  async handle({
    user,
  }: GetStaffAppointmentControllerRequest): Promise<HttpResponse> {
    const result = await this.getStaffAppointments.execute({
      user,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case GetStaffAppointmentStaffNotExists:
          return notFound(error)
        default:
          return clientError(error)
      }
    } else {
      const toPersistence = result.value.map((appointment: Appointment) =>
        AppointmentMapper.toPersistence(appointment)
      )

      return ok({
        data: toPersistence,

        totalCount: toPersistence.length,
      })
    }
  }
}
