import { Post } from '@modules/http/social/domain/timeline/Post'
import { InMemoryLikesRepository } from '@modules/http/social/repositories/in-memory/InMemoryLikesRepository'
import { InMemoryPostsRepository } from '@modules/http/social/repositories/in-memory/InMemoryPostsRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { LikePost } from './LikePost'

let postsRepository: InMemoryPostsRepository
let likesRepository: InMemoryLikesRepository
let likePost: LikePost

describe('LikePost', () => {
  beforeEach(async () => {
    postsRepository = new InMemoryPostsRepository()
    likesRepository = new InMemoryLikesRepository()
    likePost = new LikePost(postsRepository, likesRepository)
  })

  it('should be able to like a post', async () => {
    const post = Post.create(
      {
        authorId: '12345',
        content: 'Hey Hey Ou Ou',
      },
      'yeyebozoyatta'
    )

    if (post.isRight()) {
      await postsRepository.create(post.value)
    }

    const result = await likePost.execute({
      authorId: '123456',
      postId: 'yeyebozoyatta',
      unlike: false,
    })

    expect(result.isRight()).toBeTruthy()
  })

  it('should not be able to like a post', async () => {
    const post = Post.create(
      {
        authorId: '12345',
        content: 'Hey Hey Ou Ou',
      },
      'yeyebozoyatta1'
    )

    if (post.isRight()) {
      await postsRepository.create(post.value)
    }

    const result = await likePost.execute({
      authorId: '123456',
      postId: 'yeyebozoyatta',
      unlike: false,
    })

    expect(result.isLeft()).toBeTruthy()
  })

  it('should be able to unlike post', async () => {
    const post = Post.create(
      {
        authorId: '12345',
        content: 'Hey Hey Ou Ou',
      },
      'yeyebozoyatta'
    )

    if (post.isRight()) {
      await postsRepository.create(post.value)
    }

    const result = await likePost.execute({
      authorId: '123456',
      postId: 'yeyebozoyatta',
      unlike: false,
    })

    expect(result.isRight()).toBeTruthy()

    const deslike = await likePost.execute({
      authorId: '123456',
      postId: 'yeyebozoyatta',
      unlike: true,
    })

    expect(deslike.isRight()).toBeTruthy()
  })
})
