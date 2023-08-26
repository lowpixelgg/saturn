import {
  Post as PersistencePost,
  Likes as PesistenceLikes,
  Comment as PersistenceComments,
} from '@prisma/client'
import { Comments } from '../domain/timeline/Comments'
import { Likes } from '../domain/timeline/Likes'
import { Post } from '../domain/timeline/Post'
import { CommentMapper } from './CommentMapper'
import { LikeMapper } from './LikeMapper'

type PersistenceLikeRaw = {
  id: string
  content: string
  Likes: PesistenceLikes[]
  Comment: PersistenceComments[]
  published: boolean
  authorId: string
  createdAt: Date
}

export class PostMapper {
  static toDomain(raw: PersistenceLikeRaw): Post {
    const likeMapper = raw.Likes.map(like => LikeMapper.toDomain(like))
    const commentMapper = raw.Comment.map(comment =>
      CommentMapper.toDomain(comment)
    )

    const post = Post.create(
      {
        authorId: raw.authorId,
        content: raw.content,
        published: raw.published,
        Likes: Likes.create(likeMapper),
        createdAt: raw.createdAt,
        Comments: Comments.create(commentMapper),
      },
      raw.id
    )

    if (post.isRight()) {
      return post.value
    }

    return null
  }

  static toPersistence(raw: PersistencePost) {
    return {
      authorId: raw.authorId,
      content: raw.content,
      createdAt: raw.createdAt,
      published: raw.published,
    }
  }
}
