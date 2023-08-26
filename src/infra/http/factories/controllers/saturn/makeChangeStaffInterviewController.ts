import { PrismaUserRepository } from '@modules/http/accounts/repositories/prisma/PrismaUserRepository'
import { Controller } from '@core/infra/Controller'
import { PrismaAppointmentsRepository } from '@modules/http/player/repositories/prisma/PrismaAppointmentsRepository'
import { PrismaStaffRepository } from '@modules/http/saturn/repositories/prisma/PrismaStaffRepository'
import { ChangeStaffInterview } from '@modules/http/saturn/useCases/ChangeStaffInterview/ChangeStaffInterview'
import { ChangeStaffInterviewController } from '@modules/http/saturn/useCases/ChangeStaffInterview/ChangeStaffInterviewController'
import { PrismaTokensRepository } from '@modules/http/accounts/repositories/prisma/PrismaTokensRepository'

export function makeChangeStaffInterviewController(): Controller {
  const tokensRepository = new PrismaTokensRepository()
  const usersRepository = new PrismaUserRepository(null, null, tokensRepository)
  const appointmentRepository = new PrismaAppointmentsRepository()
  const staffsRepository = new PrismaStaffRepository()
  const useCase = new ChangeStaffInterview(
    usersRepository,
    appointmentRepository,
    staffsRepository,
    tokensRepository
  )
  const controller = new ChangeStaffInterviewController(useCase)

  return controller
}
