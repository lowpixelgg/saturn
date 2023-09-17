import { Either, left, right } from '@core/logic/Either';
import { CommentCommentPostNotExist } from './errors/CreateCommentPostNotExist';
import { Comment } from '@modules/http/social/domain/timeline/Comment';
import ICommentsRepository from '@modules/http/social/repositories/ICommentsRepository';
import { IPostsRepository } from '@modules/http/social/repositories/IPostsRespository';

type CreateCommentRequest = {
  postId: string;
  content: string;
  user: { id: string };
};

type CreateCommentResponse = Either<CommentCommentPostNotExist, Comment>;

export class CreateComment {
  constructor(private postsRepository: IPostsRepository) {}

  async execute({
    postId,
    content,
    user,
  }: CreateCommentRequest): Promise<CreateCommentResponse> {
    const exists = await this.postsRepository.exists(postId);

    if (!exists) {
      return left(new CommentCommentPostNotExist());
    }

    const post = await this.postsRepository.findOne(postId);

    const createComment = Comment.create({
      authorId: user.id,
      content: content,
      postId: post.id,
    });

    post.addComment(createComment);

    await this.postsRepository.save(post);

    return right(createComment);
  }
}
