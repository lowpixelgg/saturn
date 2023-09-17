import { PrismaUserRepository } from '@modules/http/accounts/repositories/prisma/PrismaUserRepository';
import { Controller } from '@core/infra/Controller';
import { AuthenticateUser } from '@modules/http/accounts/useCases/AuthenticateUser/AuthenticateUser';
import { AuthenticateUserController } from '@modules/http/accounts/useCases/AuthenticateUser/AuthenticateUserController';

export function makeAuthenticateController(): Controller {
  const repository = new PrismaUserRepository();
  const useCase = new AuthenticateUser(repository);
  const controller = new AuthenticateUserController(useCase);

  return controller;
}
