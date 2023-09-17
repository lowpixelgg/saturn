import { Like } from '@modules/http/social/domain/timeline/Like';
import ILikesRepository from '@modules/http/social/repositories/ILikesRepository';
import { IPostsRepository } from '@modules/http/social/repositories/IPostsRespository';
import { Either, left, right } from '@core/logic/Either';
import { LikePostAlreadyLiked } from './errors/LikePostAlreadyLiked';
import { LikePostDoesNotExist } from './errors/LikePostDoesNotExist';

type LikePostRequest = {
  postId: string;
  unlike: boolean;
  authorId: string;
};

type LikePostResponse = Either<
  LikePostDoesNotExist | LikePostAlreadyLiked,
  Like
>;

export class LikePost {
  constructor(
    private postsRepository: IPostsRepository,
    private likesRepository: ILikesRepository
  ) {}

  async execute({
    postId,
    unlike,
    authorId,
  }: LikePostRequest): Promise<LikePostResponse> {
    const exists = await this.postsRepository.exists(postId);

    if (!exists) {
      return left(new LikePostDoesNotExist());
    }

    const alreadyLiked = await this.likesRepository.exists(postId, authorId);
    const post = await this.postsRepository.findOne(postId);

    if (alreadyLiked) {
      if (unlike) {
        const like = await this.likesRepository.findOne(postId, authorId);
        post.deslike(like);

        await this.postsRepository.save(post);

        return right(like);
      }

      return left(new LikePostAlreadyLiked());
    }

    const like = Like.create({
      authorId: authorId,
      postId: postId,
    });

    post.like(like);

    await this.postsRepository.save(post);

    return right(like);
  }
}
