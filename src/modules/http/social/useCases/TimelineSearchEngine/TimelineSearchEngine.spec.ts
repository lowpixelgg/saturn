import { Post } from '@modules/http/social/domain/timeline/Post';
import { InMemoryPostsRepository } from '@modules/http/social/repositories/in-memory/InMemoryPostsRepository';
import { InMemoryProfileFollowsRepository } from '@modules/http/social/repositories/in-memory/InMemoryProfileFollowsRepository';
import { InMemoryProfilesRepository } from '@modules/http/social/repositories/in-memory/InMemoryProfilesRepository';
import { createUser } from '@utils/tests/UserFactory';
import { beforeEach, describe, it, expect } from 'vitest';
import { TimelineSearchEngine } from './TimelineSearchEngine';

let profilesRepository: InMemoryProfilesRepository;
let postsRepository: InMemoryPostsRepository;
let timelineSearchEngine: TimelineSearchEngine;

describe('TimelineSearchEngine', async () => {
  beforeEach(async () => {
    profilesRepository = new InMemoryProfilesRepository();
    postsRepository = new InMemoryPostsRepository();
    timelineSearchEngine = new TimelineSearchEngine(
      postsRepository,
      profilesRepository
    );

    const post = Post.create({
      authorId: '12345',
      content: 'Yeye yatta Yatta',
    });

    const post2 = Post.create({
      authorId: '123456',
      content: 'Yeye yatta Yatta',
    });

    if (post.isRight() && post2.isRight()) {
      await postsRepository.create(post.value);
      await postsRepository.create(post2.value);
    }
  });

  it('should be able to fetch user feed', async () => {
    const result = await timelineSearchEngine.execute({
      user: { id: '12345' },
    });

    expect(result.isRight()).toBeTruthy();

    if (result.isRight()) {
      expect(result.value.totalCount).toBe(2);
    }
  });
});
