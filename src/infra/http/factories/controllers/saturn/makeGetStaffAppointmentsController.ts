import { Controller } from '@core/infra/Controller'
import { PrismaStaffRepository } from '@modules/http/saturn/repositories/prisma/PrismaStaffRepository'
import { PrismaAppointmentsRepository } from '@modules/http/player/repositories/prisma/PrismaAppointmentsRepository'
import { GetStaffAppointment } from '@modules/http/saturn/useCases/GetStaffAppointments/GetStaffAppointments'
import { GetStaffAppointmentsController } from '@modules/http/saturn/useCases/GetStaffAppointments/GetStaffAppointmentsController'

export function makeGetStaffAppointmentsController(): Controller {
  const staffRepository = new PrismaStaffRepository()
  const appointmentsRepository = new PrismaAppointmentsRepository()
  const useCase = new GetStaffAppointment(
    staffRepository,
    appointmentsRepository
  )
  const controller = new GetStaffAppointmentsController(useCase)

  return controller
}
