import { Comments } from '@modules/http/social/domain/timeline/Comments'
import { CommentMapper } from '@modules/http/social/mappers/CommentMapper'
import { prisma } from '@infra/prisma/prisma-client'
import ICommentsRepository from '../ICommentsRepository'

export class PrismaCommentRepository implements ICommentsRepository {
  constructor() {}

  async create(comments: Comments): Promise<void> {
    const data = comments
      .getItems()
      .map(comment => CommentMapper.toPersistence(comment))

    await prisma.comment.createMany({
      data: data,
    })
  }

  async save(comments: Comments): Promise<void> {
    if (comments.getNewItems().length > 0) {
      const data = comments
        .getNewItems()
        .map(comment => CommentMapper.toPersistence(comment))

      await prisma.comment.createMany({
        data,
      })
    }

    if (comments.getRemovedItems().length > 0) {
      const removeIds = comments.getRemovedItems().map(comment => comment.id)
      await prisma.comment.deleteMany({
        where: {
          id: {
            in: removeIds,
          },
        },
      })
    }
  }
}
