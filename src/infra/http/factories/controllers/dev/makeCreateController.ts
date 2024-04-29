import { PrismaUserRepository } from '@modules/http/accounts/repositories/prisma/PrismaUserRepository';
import { Controller } from '@core/infra/Controller';
import { PrismaTokensRepository } from '@modules/http/accounts/repositories/prisma/PrismaTokensRepository';
import { CreateUserController } from '@modules/http/accounts/useCases/CreateUser/CreateUserController';
import { CreateUser } from '@modules/http/accounts/useCases/CreateUser/CreateUser';

export function makeCreateController(): Controller {
  const tokensRepository = new PrismaTokensRepository();
  const repository = new PrismaUserRepository(null, null, tokensRepository);
  const useCase = new CreateUser(repository);
  const controller = new CreateUserController(useCase);

  return controller;
}
