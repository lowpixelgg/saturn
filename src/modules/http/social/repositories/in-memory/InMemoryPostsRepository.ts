import { Post } from '@modules/http/social/domain/timeline/Post'
import ICommentsRepository from '../ICommentsRepository'
import ILikesRepository from '../ILikesRepository'
import { IPostsRepository, SearchResponse } from '../IPostsRespository'

export class InMemoryPostsRepository implements IPostsRepository {
  private items: Post[] = []

  constructor(
    private likesRepository?: ILikesRepository,
    private commentsRepository?: ICommentsRepository
  ) {}

  async delete(post: Post): Promise<void> {
    const find = this.items.findIndex(post => post.id === post.id)
    delete this.items[find]
  }

  async exists(postId: string): Promise<boolean> {
    const exists = this.items.findIndex(post => post.id === postId)

    return !!this.items[exists]
  }

  async findOne(postId: string): Promise<Post> {
    const find = this.items.findIndex(post => post.id === postId)
    return this.items[find]
  }

  async findAll(): Promise<Post[]> {
    return this.items
  }

  async save(raw: Post): Promise<void> {
    const postIndex = this.items.findIndex(post => post.id === raw.id)
    this.items[postIndex] = raw

    if (this.likesRepository) {
      await this.likesRepository.save(raw.Likes)
    }

    if (this.commentsRepository) {
      await this.commentsRepository.save(raw.Comments)
    }
  }

  async create(post: Post): Promise<void> {
    this.items.push(post)
  }

  async search(
    query: string,
    page: number,
    perPage: number
  ): Promise<SearchResponse> {
    let itemList = this.items

    if (query) {
      itemList = this.items.filter(post => {
        const search = new RegExp(query, 'i')

        return search.test(post.authorId)
      })
    }

    return {
      data: itemList.slice((page - 1) * perPage, page * perPage),
      totalCount: itemList.length,
    }
  }

  async engressUserFeed(
    followUpIds: string[],
    query: string,
    page: number,
    perPage: number
  ): Promise<SearchResponse> {
    let itemList = this.items

    if (query) {
      const search = this.items.filter(post => post.authorId === query)
      const getFollowUpPots = this.items.filter(post =>
        followUpIds.includes(post.authorId)
      )

      itemList = [...search, ...getFollowUpPots]
    }

    return {
      data: itemList.slice((page - 1) * perPage, page * perPage),
      totalCount: itemList.length,
    }
  }
}
