import { Controller } from '@core/infra/Controller';
import { ChangeAppointmentStatusController } from '@modules/http/saturn/useCases/ChangeAppointmentStatus/ChangeAppointmentStatusControlller';
import { PrismaUserRepository } from '@modules/http/accounts/repositories/prisma/PrismaUserRepository';
import { PrismaAppointmentsRepository } from '@modules/http/player/repositories/prisma/PrismaAppointmentsRepository';
import { ChangeAppointmentStatus } from '@modules/http/saturn/useCases/ChangeAppointmentStatus/ChangeAppointmentStatus';
import { PrismaConnectionsRepository } from '@modules/http/accounts/repositories/prisma/PrismaConnectionsRepository';

export function makeChangeAppointmentStatusController(): Controller {
  const usersRepository = new PrismaUserRepository();
  const connectionsRepository = new PrismaConnectionsRepository();
  const appointmentsRepository = new PrismaAppointmentsRepository();
  const useCase = new ChangeAppointmentStatus(
    appointmentsRepository,
    connectionsRepository,
    usersRepository
  );
  const controller = new ChangeAppointmentStatusController(useCase);

  return controller;
}
