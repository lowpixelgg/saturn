import { Like } from '@modules/http/social/domain/timeline/Like'
import { Likes } from '@modules/http/social/domain/timeline/Likes'
import ILikesRepository from '../ILikesRepository'

export class InMemoryLikesRepository implements ILikesRepository {
  private items: Like[] = []

  constructor() {}

  async findOne(postId: string, authorId: string): Promise<Like> {
    const exists = this.items.find(
      post => post.id === postId && post.authorId === authorId
    )
    return exists
  }

  async exists(postId: string, authorId: string): Promise<boolean> {
    const exists = this.items.find(
      post => post.id === postId && post.authorId === authorId
    )
    return !!exists
  }

  async create(likes: Likes): Promise<void> {
    this.items.push(...likes.getNewItems())

    likes.getRemovedItems().forEach(like => {
      const likeIndex = this.items.findIndex(likeItem => {
        return likeItem.id === like.id
      })

      this.items.splice(likeIndex, 1)
    })
  }

  async save(likes: Likes): Promise<void> {
    this.items.push(...likes.getItems())
  }
}
