import { Content } from '@modules/http/social/domain/timeline/Content';
import { Post } from '@modules/http/social/domain/timeline/Post';
import { IPostsRepository } from '@modules/http/social/repositories/IPostsRespository';
import { Either, left, right } from '@core/logic/Either';
import { InvalidPostContentLength } from './errors/InvalidPostContentLength';
import { InvalidPostUserNotFound } from './errors/InvalidPostUserNotFound';

type CreatePostRequest = {
  content: string;
  authorId: string;
};

type CreatePostResponse = Either<
  InvalidPostContentLength | InvalidPostUserNotFound,
  Post
>;

export class CreatePost {
  constructor(private postsRepository: IPostsRepository) {}

  async execute({
    content,
    authorId,
  }: CreatePostRequest): Promise<CreatePostResponse> {
    const contentOrError = Content.create(content);

    if (contentOrError.isLeft()) {
      return left(new InvalidPostContentLength());
    }

    const post = Post.create({
      authorId,
      content,
    });

    if (post.isLeft()) {
      return left(post.value);
    }

    const newPost = post.value;
    await this.postsRepository.create(newPost);

    return right(newPost);
  }
}
