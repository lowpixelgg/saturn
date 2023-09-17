import { InMemoryPostsRepository } from '@modules/http/social/repositories/in-memory/InMemoryPostsRepository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreatePost } from './CreatePost';

let postsRepository: InMemoryPostsRepository;
let createPost: CreatePost;

describe('Post UseCae', () => {
  beforeEach(async () => {
    postsRepository = new InMemoryPostsRepository();
    createPost = new CreatePost(postsRepository);
  });

  it('should be able to create new post', async () => {
    const post = await createPost.execute({
      authorId: '12345',
      content: 'Olá mundo este é o meu primeiro post',
    });

    expect(post.isRight()).toBeTruthy();
  });

  it('not should be able to create a new post with invalid length', async () => {
    const post = await createPost.execute({
      authorId: '123456',
      content: '',
    });

    expect(post.isLeft()).toBeTruthy();
  });

  it('not should be able to create a new post with more than 280 characters', async () => {
    const post = await createPost.execute({
      authorId: '123456',
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    });

    expect(post.isLeft()).toBeTruthy();
  });
});
