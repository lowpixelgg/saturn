import { Controller } from '@core/infra/Controller';
import { ActivateUser } from '@modules/http/accounts/useCases/ActivateUser/ActivateUser';
import { ActivateController } from '@modules/http/accounts/useCases/ActivateUser/ActivateController';
import { PrismaUserRepository } from '@modules/http/accounts/repositories/prisma/PrismaUserRepository';
import { PrismaNotificationsRepository } from '@modules/http/accounts/repositories/prisma/PrismaNotificationsRepository';
import { PrismaTokensRepository } from '@modules/http/accounts/repositories/prisma/PrismaTokensRepository';

export function makeActivateUserController(): Controller {
  const tokensRepository = new PrismaTokensRepository();
  const notificationRepo = new PrismaNotificationsRepository();
  const repository = new PrismaUserRepository(
    notificationRepo,
    null,
    tokensRepository
  );
  const useCase = new ActivateUser(repository, tokensRepository);
  const controller = new ActivateController(useCase);

  return controller;
}
