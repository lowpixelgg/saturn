import { PrismaUserRepository } from '@modules/http/accounts/repositories/prisma/PrismaUserRepository';
import { Controller } from '@core/infra/Controller';
import { RecoveryPassword } from '@modules/http/accounts/useCases/RecoveryUser/RecoveryPassword';
import { RecoveryPasswordController } from '@modules/http/accounts/useCases/RecoveryUser/RecoveryPasswordController';
import { PrismaTokensRepository } from '@modules/http/accounts/repositories/prisma/PrismaTokensRepository';

export function makeRecoveryPasswordController(): Controller {
  const tokensRepository = new PrismaTokensRepository();
  const repository = new PrismaUserRepository(null, null, tokensRepository);
  const useCase = new RecoveryPassword(repository, tokensRepository);
  const controller = new RecoveryPasswordController(useCase);

  return controller;
}
