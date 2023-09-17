import { Controller } from '@core/infra/Controller';
import { GetAccountData } from '@modules/http/accounts/useCases/GetAccountData/GetAccountData';
import { GetAccountDataController } from '@modules/http/accounts/useCases/GetAccountData/GetAccountDataController';
import { PrismaUserRepository } from '@modules/http/accounts/repositories/prisma/PrismaUserRepository';

export function makeGetAccountDataController(): Controller {
  const repository = new PrismaUserRepository();
  const useCase = new GetAccountData(repository);
  const controller = new GetAccountDataController(useCase);

  return controller;
}
