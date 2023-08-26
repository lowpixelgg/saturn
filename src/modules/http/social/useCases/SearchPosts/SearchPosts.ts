import { Post } from '@modules/http/social/domain/timeline/Post'
import { CommentMapper } from '@modules/http/social/mappers/CommentMapper'
import { LikeMapper } from '@modules/http/social/mappers/LikeMapper'
import { IPostsRepository } from '@modules/http/social/repositories/IPostsRespository'
import { IProfilesRepository } from '@modules/http/social/repositories/IProfilesRepository'
import { Either, left, right } from '@core/logic/Either'
import { SearchPostUserNotFound } from './errors/SearchPostUserNotFound'

type SearchPostsRequest = {
  user: { id: string }
  query?: string
  page?: number
  perPage?: number
}

type SearchPostsResponse = {
  data: Object[]
  totalCount: number
}

type PromiseSearchResponse = Either<SearchPostUserNotFound, SearchPostsResponse>

export class SearchPosts {
  constructor(
    private postsRepository: IPostsRepository,
    private profilesRepository: IProfilesRepository
  ) {}

  async execute({
    query,
    user,
    page = 1,
    perPage = 19700,
  }: SearchPostsRequest): Promise<PromiseSearchResponse> {
    const exists = await this.profilesRepository.exists(user.id)

    if (!exists) {
      return left(new SearchPostUserNotFound())
    }

    const { data, totalCount } = await this.postsRepository.search(
      query,
      page,
      perPage
    )

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
        post.Likes.getItems().find(like => like.authorId === user.id)
      ),
      createdAt: post.createdAt,
    }))

    return right({ data: posts, totalCount })
  }
}
