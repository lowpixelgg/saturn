import { Comment as PersistenceComment } from '@prisma/client'
import { Comment } from '../domain/timeline/Comment'

type CommentPersistenceRaw = {
  id: string
  authorId: string
  postId: string
  content: string
  createdAt?: Date
}

export class CommentMapper {
  static toDomain(raw: PersistenceComment): Comment {
    const comment = Comment.create(
      {
        authorId: raw.authorId,
        content: raw.content,
        postId: raw.authorId,
        createdAt: raw.createdAt,
      },
      raw.id
    )

    return comment
  }

  static toPersistence(raw: CommentPersistenceRaw) {
    return {
      id: raw.id,
      authorId: raw.authorId,
      content: raw.content,
      postId: raw.postId,
      createdAt: raw.createdAt,
    }
  }
}
