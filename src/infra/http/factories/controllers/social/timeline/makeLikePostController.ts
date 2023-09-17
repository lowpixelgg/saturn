import { PrismaLikesRepository } from '@modules/http/social/repositories/prisma/PrismaLikesRepository';
import { PrismaPostsRepository } from '@modules/http/social/repositories/prisma/PrismaPostsRepository';
import { LikePost } from '@modules/http/social/useCases/LikePost/LikePost';
import { LikePostController } from '@modules/http/social/useCases/LikePost/LikePostController';
import { Controller } from '@core/infra/Controller';

export function makeLikePostController(): Controller {
  const likesRepository = new PrismaLikesRepository();
  const repository = new PrismaPostsRepository(likesRepository);
  const useCase = new LikePost(repository, likesRepository);
  const controller = new LikePostController(useCase);

  return controller;
}
