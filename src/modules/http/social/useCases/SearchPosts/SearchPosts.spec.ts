import { Post } from '@modules/http/social/domain/timeline/Post'
import { InMemoryPostsRepository } from '@modules/http/social/repositories/in-memory/InMemoryPostsRepository'
import { InMemoryProfilesRepository } from '@modules/http/social/repositories/in-memory/InMemoryProfilesRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPosts } from './SearchPosts'

let postsRepository: InMemoryPostsRepository
let profilesRepository: InMemoryProfilesRepository
let searchPosts: SearchPosts

describe('SearchPosts useCase', () => {
  beforeEach(async () => {
    postsRepository = new InMemoryPostsRepository()
    profilesRepository = new InMemoryProfilesRepository()
    searchPosts = new SearchPosts(postsRepository, profilesRepository)

    for (let i = 0; i < 20; i++) {
      const post = Post.create({
        authorId: '1234' + i,
        content: 'Olee Olee Ole Olaaa',
      })

      if (post.isRight()) {
        await postsRepository.create(post.value)
      }
    }
  })

  it('should be able to search post', async () => {
    const response = await searchPosts.execute({
      user: {
        id: '12345',
      },
    })

    expect(response.isRight()).toBeTruthy()
  })

  it('should be able to search through senders', async () => {
    const response = await searchPosts.execute({
      user: {
        id: '12312321',
      },
    })

    expect(response.isLeft()).toBeTruthy()
  })
})
