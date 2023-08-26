import { PrismaCommentRepository } from '@modules/http/social/repositories/prisma/PrismaCommentRepository'
import { PrismaLikesRepository } from '@modules/http/social/repositories/prisma/PrismaLikesRepository'
import { PrismaPostsRepository } from '@modules/http/social/repositories/prisma/PrismaPostsRepository'
import { DeletePost } from '@modules/http/social/useCases/DeletePost/DeletePost'
import { DeletePostController } from '@modules/http/social/useCases/DeletePost/DeletePostController'
import { Controller } from '@core/infra/Controller'

export function makeDeletePostController(): Controller {
  const likesRepo = new PrismaLikesRepository()
  const commentsRepo = new PrismaCommentRepository()
  const repository = new PrismaPostsRepository(likesRepo, commentsRepo)
  const useCase = new DeletePost(repository)
  const controller = new DeletePostController(useCase)

  return controller
}
