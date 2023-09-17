import { PrismaWhitelistRepository } from '@modules/http/player/repositories/prisma/PrismaWhitelistRepository';
import { Controller } from '@core/infra/Controller';
import { CreateWhitelist } from '@modules/http/player/useCases/CreateWhitelist/CreateWhitelist';
import { PrismaAnswersRepository } from '@modules/http/player/repositories/prisma/PrismaAnswerRepository';
import { CreateWhitelistController } from '@modules/http/player/useCases/CreateWhitelist/CreateWhitelistController';
import { PrismaUserRepository } from '@modules/http/accounts/repositories/prisma/PrismaUserRepository';
import { PrismaConnectionsRepository } from '@modules/http/accounts/repositories/prisma/PrismaConnectionsRepository';
import { CreateAppointment } from '@modules/http/player/useCases/CreateAppointment/CreateAppointment';
import { PrismaAppointmentsRepository } from '@modules/http/player/repositories/prisma/PrismaAppointmentsRepository';
import { CreateAppointmentConnError } from '@modules/http/player/useCases/CreateAppointment/CreateAppointmentController';
import { PrismaTimesRepository } from '@modules/http/saturn/repositories/prisma/PrismaTimesRepository';
import { PrismaStaffRepository } from '@modules/http/saturn/repositories/prisma/PrismaStaffRepository';

export function makeCreateAppointmentController(): Controller {
  const connectionsRepository = new PrismaConnectionsRepository();
  const usersRepository = new PrismaUserRepository();
  const timesRepository = new PrismaTimesRepository();
  const staffRepository = new PrismaStaffRepository();
  const appointmentsRepository = new PrismaAppointmentsRepository();
  const useCase = new CreateAppointment(
    usersRepository,
    timesRepository,
    staffRepository,
    connectionsRepository,
    appointmentsRepository
  );
  const controller = new CreateAppointmentConnError(useCase);

  return controller;
}
