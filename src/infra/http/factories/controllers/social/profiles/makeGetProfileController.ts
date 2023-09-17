import { PrismaProfilesRepository } from '@modules/http/social/repositories/prisma/PrismaProfilesRepository';
import { Controller } from '@core/infra/Controller';
import { GetProfile } from '@modules/http/social/useCases/GetProfile/GetProfile';
import { GetProfileController } from '@modules/http/social/useCases/GetProfile/GetProfileController';

export function makeGetProfileController(): Controller {
  const repository = new PrismaProfilesRepository();
  const useCase = new GetProfile(repository);
  const controller = new GetProfileController(useCase);

  return controller;
}
