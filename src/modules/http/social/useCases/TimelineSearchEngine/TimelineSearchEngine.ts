import { CommentMapper } from '@modules/http/social/mappers/CommentMapper';
import { LikeMapper } from '@modules/http/social/mappers/LikeMapper';
import { IPostsRepository } from '@modules/http/social/repositories/IPostsRespository';
import { IProfilesRepository } from '@modules/http/social/repositories/IProfilesRepository';
import { Either, left, right } from '@core/logic/Either';
import { TimelineSearchEngineProfileNotExists } from './errors/TimelineSearchEngineProfileNotExists';

type TimelineSearchEngineRequest = {
  user: { id: string };
  page?: number;
  perPage?: number;
};

type TimelineSearchEngineResponse = {
  data: object[];
  totalCount: number;
};

type TimelineSearchEngineEngineResponse = Either<
  TimelineSearchEngineProfileNotExists,
  TimelineSearchEngineResponse
>;

export class TimelineSearchEngine {
  constructor(
    private postsRepository: IPostsRepository,
    private profilesRepository: IProfilesRepository
  ) {}

  async execute({
    user,
    page = 1,
    perPage = 20,
  }: TimelineSearchEngineRequest): Promise<TimelineSearchEngineEngineResponse> {
    const exists = await this.profilesRepository.exists(user.id);

    if (!exists) {
      return left(new TimelineSearchEngineProfileNotExists());
    }

    const userProfile = await this.profilesRepository.findOne(user.id);
    const userfollows = userProfile.following as object[];
    const query = user.id;

    const { data, totalCount } = await this.postsRepository.engressUserFeed(
      userfollows.map((follow: any) => follow.followers_id),
      query,
      page,
      perPage
    );

    const posts = data.map(post => ({
      _id: post.id,
      authorId: post.authorId,
      content: post.content,
      published: post.published,
      Comments: post.Comments.getItems().map(comment =>
        CommentMapper.toPersistence(comment)
      ),
      Likes: post.Likes.getItems().map(like => LikeMapper.toPersistence(like)),
      isLiked: Boolean(
        post.Likes.getItems().find(like => like.authorId === query)
      ),
      createdAt: post.createdAt,
    }));

    return right({ data: posts, totalCount });
  }
}
