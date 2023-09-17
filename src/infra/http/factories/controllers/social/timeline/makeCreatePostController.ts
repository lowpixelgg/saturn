import { PrismaCommentRepository } from '@modules/http/social/repositories/prisma/PrismaCommentRepository';
import { PrismaPostsRepository } from '@modules/http/social/repositories/prisma/PrismaPostsRepository';
import { CreatePost } from '@modules/http/social/useCases/CreatePost/CreatePost';
import { CreatePostController } from '@modules/http/social/useCases/CreatePost/CreatePostController';
import { Controller } from '@core/infra/Controller';

export function makeCreatePostController(): Controller {
  const repository = new PrismaPostsRepository();
  const useCase = new CreatePost(repository);
  const controller = new CreatePostController(useCase);

  return controller;
}
