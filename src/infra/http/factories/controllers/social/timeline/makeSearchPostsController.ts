import { PrismaPostsRepository } from '@modules/http/social/repositories/prisma/PrismaPostsRepository';
import { PrismaProfilesRepository } from '@modules/http/social/repositories/prisma/PrismaProfilesRepository';
import { SearchPosts } from '@modules/http/social/useCases/SearchPosts/SearchPosts';
import { SearchPostsController } from '@modules/http/social/useCases/SearchPosts/SearchPostsController';
import { Controller } from '@core/infra/Controller';

export function makeSearchPostsController(): Controller {
  const repository = new PrismaPostsRepository();
  const profilesRepository = new PrismaProfilesRepository();
  const useCase = new SearchPosts(repository, profilesRepository);
  const controller = new SearchPostsController(useCase);

  return controller;
}
