import { describe, expect, it } from 'vitest';
import { Content } from './Content';

describe('Content', () => {
  it('should be able to crate a post-content', () => {
    const contentOrError = Content.create(
      'Olá mundo este é o meu primeiro post na Rocket.'
    );

    expect(contentOrError.isRight()).toBeTruthy();
  });

  it('not should be able to create a post-content with more than 280 characters', () => {
    const contentOrError = Content.create(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    );

    expect(contentOrError.isLeft()).toBeTruthy();
  });
});
