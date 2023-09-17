import { Controller } from '@core/infra/Controller';
import { ContentAvatar } from '@modules/http/social/useCases/Content/Avatar';
import { PrismaUserRepository } from '@modules/http/accounts/repositories/prisma/PrismaUserRepository';
import { ContentController } from '@modules/http/social/useCases/Content/ContentController';
import { PrismaProfilesRepository } from '@modules/http/social/repositories/prisma/PrismaProfilesRepository';
import { ContentBanner } from '@modules/http/social/useCases/Content/Banner';

export function makeContentController(): Controller {
  const repository = new PrismaProfilesRepository();
  const contentBanner = new ContentBanner(repository);
  const contentAvatar = new ContentAvatar(repository);
  const controller = new ContentController(contentAvatar, contentBanner);

  return controller;
}
