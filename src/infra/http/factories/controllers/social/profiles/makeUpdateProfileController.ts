import { PrismaProfilesRepository } from '@modules/http/social/repositories/prisma/PrismaProfilesRepository';
import { Controller } from '@core/infra/Controller';
import { UpdateProfile } from '@modules/http/social/useCases/UpdateProfile/UpdateProfile';
import { UpdateProfileController } from '@modules/http/social/useCases/UpdateProfile/UpdateProfileController';
import { PrismaVisitorsRepository } from '@modules/http/social/repositories/prisma/PrismaVisitorsRepository';

export function makeUpdateProfileController(): Controller {
  const repository = new PrismaProfilesRepository();
  const useCase = new UpdateProfile(repository);
  const controller = new UpdateProfileController(useCase);

  return controller;
}
