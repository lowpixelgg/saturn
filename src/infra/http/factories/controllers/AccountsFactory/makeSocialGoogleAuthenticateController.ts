import { PrismaUserRepository } from '@modules/http/accounts/repositories/prisma/PrismaUserRepository';
import { Controller } from '@core/infra/Controller';
import { SocialGoogleAuthenticate } from '@modules/http/accounts/useCases/SocialAuthenticate/SocialGoogleAuthenticate';
import { SocialGoogleAuthenticateController } from '@modules/http/accounts/useCases/SocialAuthenticate/SocialGoogleAuthenticateController';
import { PrismaNotificationsRepository } from '@modules/http/accounts/repositories/prisma/PrismaNotificationsRepository';

export function makeSocialGoogleAuthenticateController(): Controller {
  const notificationRepo = new PrismaNotificationsRepository();
  const repository = new PrismaUserRepository(notificationRepo);
  const useCase = new SocialGoogleAuthenticate(repository);
  const controller = new SocialGoogleAuthenticateController(useCase);

  return controller;
}
