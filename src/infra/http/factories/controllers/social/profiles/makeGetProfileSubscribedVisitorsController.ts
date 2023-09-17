import { Controller } from '@core/infra/Controller';
import { GetProfileVisitors } from '@modules/http/social/useCases/GetProfileVisitors/GetProfileVisitors';
import { GetProfileVisitorsController } from '@modules/http/social/useCases/GetProfileVisitors/GetProfileVisitorsController';
import { PrismaVisitorsRepository } from '@modules/http/social/repositories/prisma/PrismaVisitorsRepository';
import { PrismaProfilesRepository } from '@modules/http/social/repositories/prisma/PrismaProfilesRepository';

export function makeGetProfileSubscribedVisitorsController(): Controller {
  const repository2nd = new PrismaVisitorsRepository();
  const repository1nd = new PrismaProfilesRepository(repository2nd);
  const useCase = new GetProfileVisitors(repository2nd, repository1nd);
  const controller = new GetProfileVisitorsController(useCase);

  return controller;
}
