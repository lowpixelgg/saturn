import { describe, it, expect, beforeEach } from 'vitest'
import { Post } from '../../domain/timeline/Post'
import { InMemoryCommentsRepository } from '../../repositories/in-memory/InMemoryCommentsRepository'
import { InMemoryLikesRepository } from '../../repositories/in-memory/InMemoryLikesRepository'
import { InMemoryPostsRepository } from '../../repositories/in-memory/InMemoryPostsRepository'
import { DeletePost } from './DeletePost'

let commentsRepository: InMemoryCommentsRepository
let likesRepository: InMemoryLikesRepository
let postsRepository: InMemoryPostsRepository
let deletePost: DeletePost

describe('Delete Post', () => {
  beforeEach(async () => {
    commentsRepository = new InMemoryCommentsRepository()
    likesRepository = new InMemoryLikesRepository()
    postsRepository = new InMemoryPostsRepository(
      likesRepository,
      commentsRepository
    )
    deletePost = new DeletePost(postsRepository)
  })

  it('should be ble to delete user post', async () => {
    const post = Post.create({
      authorId: '123456',
      content: 'Hello Wolrd',
    })

    if (post.isRight()) {
      await postsRepository.create(post.value)

      const result = await deletePost.execute({ postId: post.value.id })

      expect(result.isRight()).toBeTruthy()
    }
  })

  it('not should be able to delete user post with invalid post id', async () => {
    const result = await deletePost.execute({ postId: '12356551' })

    expect(result.isLeft()).toBeTruthy()
  })
})
