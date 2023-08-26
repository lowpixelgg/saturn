import { InMemoryCommentsRepository } from '@modules/http/social/repositories/in-memory/InMemoryCommentsRepository'
import { InMemoryPostsRepository } from '@modules/http/social/repositories/in-memory/InMemoryPostsRepository'
import { describe, it, expect, beforeEach } from 'vitest'
import { CreatePost } from '../CreatePost/CreatePost'
import { CreateComment } from './CreateComment'

let commentsRepository: InMemoryCommentsRepository
let postsRepository: InMemoryPostsRepository
let createComment: CreateComment
let createPost: CreatePost

describe('Create Comment', () => {
  beforeEach(async () => {
    commentsRepository = new InMemoryCommentsRepository()
    postsRepository = new InMemoryPostsRepository(null, commentsRepository)
    createPost = new CreatePost(postsRepository)
    createComment = new CreateComment(postsRepository)
  })

  it('should be able create comment', async () => {
    const post = await createPost.execute({
      authorId: '12345',
      content: 'Yeye yatta yatta',
    })

    expect(post.isRight()).toBeTruthy()

    if (post.isRight()) {
      const comment = await createComment.execute({
        content: 'Olá mundo!',
        postId: post.value.id,
        user: { id: '123456' },
      })

      expect(comment.isRight()).toBeTruthy()
    }
  })

  it('not should be able to create comment', async () => {
    const comment = await createComment.execute({
      content: 'Olá mundo!',
      postId: 'bozo9mm',
      user: { id: 'bozo9mm' },
    })

    expect(comment.isLeft()).toBeTruthy()
  })
})
