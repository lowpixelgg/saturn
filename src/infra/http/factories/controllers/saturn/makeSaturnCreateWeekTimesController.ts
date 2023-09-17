import { Controller } from '@core/infra/Controller';
import { PrismaTimesRepository } from '@modules/http/saturn/repositories/prisma/PrismaTimesRepository';
import { PrismaStaffRepository } from '@modules/http/saturn/repositories/prisma/PrismaStaffRepository';
import { CreateWeekTimes } from '@modules/http/saturn/useCases/CreateWeekTimes/CreateWeekTimes';
import { CreateWeekTimesController } from '@modules/http/saturn/useCases/CreateWeekTimes/CreateWeekTimesCotnroller';

export function makeSaturnCreateWeekTimesController(): Controller {
  const timesRepository = new PrismaTimesRepository();
  const staffRepository = new PrismaStaffRepository(timesRepository);
  const useCase = new CreateWeekTimes(staffRepository);
  const controller = new CreateWeekTimesController(useCase);

  return controller;
}
