import { PrismaUserRepository } from '@modules/http/accounts/repositories/prisma/PrismaUserRepository';
import { Controller } from '@core/infra/Controller';
import { SaturnAuthenticate } from '@modules/http/saturn/useCases/ControlAuthenticate/SaturnAuthenticate';
import { AuthenticateUserController } from '@modules/http/saturn/useCases/ControlAuthenticate/SaturnAuthenticateController';

export function makeSaturnAuthenticationController(): Controller {
  const repository = new PrismaUserRepository();
  const useCase = new SaturnAuthenticate(repository);
  const controller = new AuthenticateUserController(useCase);

  return controller;
}
