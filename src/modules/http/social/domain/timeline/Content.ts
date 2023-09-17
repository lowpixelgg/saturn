import { Either, left, right } from '@core/logic/Either';

import { PostContentInvalidLength } from './errors/PostContentInvalidLength';

export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private constructor(content: string) {
    this.content = content;
  }

  static validate(content: string): boolean {
    if (!content || content.trim().length < 1 || content.trim().length > 280) {
      return false;
    }

    return true;
  }

  static create(content: string): Either<PostContentInvalidLength, Content> {
    if (!this.validate(content)) {
      return left(new PostContentInvalidLength());
    }

    return right(new Content(content));
  }
}
