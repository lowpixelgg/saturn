import { PrismaCommentRepository } from '@modules/http/social/repositories/prisma/PrismaCommentRepository';
import { PrismaPostsRepository } from '@modules/http/social/repositories/prisma/PrismaPostsRepository';
import { CreateComment } from '@modules/http/social/useCases/CreateComment/CreateComment';
import { CreateCommentController } from '@modules/http/social/useCases/CreateComment/CreateCommentController';
import { Controller } from '@core/infra/Controller';

export function makeCreateComment(): Controller {
  const createCommentRepo = new PrismaCommentRepository();
  const repository = new PrismaPostsRepository(null, createCommentRepo);
  const useCase = new CreateComment(repository);
  const controller = new CreateCommentController(useCase);

  return controller;
}
