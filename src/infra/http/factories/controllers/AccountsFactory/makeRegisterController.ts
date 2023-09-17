import { PrismaUserRepository } from '@modules/http/accounts/repositories/prisma/PrismaUserRepository';
import { Controller } from '@core/infra/Controller';
import { RegisterUser } from '@modules/http/accounts/useCases/RegisterUser/RegisterUser';
import { RegisterUserController } from '@modules/http/accounts/useCases/RegisterUser/RegisterUserController';
import { PrismaTokensRepository } from '@modules/http/accounts/repositories/prisma/PrismaTokensRepository';

export function makeRegisterController(): Controller {
  const tokensRepository = new PrismaTokensRepository();
  const repository = new PrismaUserRepository(null, null, tokensRepository);
  const useCase = new RegisterUser(repository);
  const controller = new RegisterUserController(useCase);

  return controller;
}
