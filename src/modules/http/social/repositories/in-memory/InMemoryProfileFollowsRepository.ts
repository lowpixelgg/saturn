import { Follow } from '@modules/http/social/domain/profiles/Follow'
import { Follows } from '@modules/http/social/domain/profiles/Follows'

import { FindByProfileParams, IFollowsRepository } from '../IFollowsRepository'

export class InMemoryProfileFollowsRepository implements IFollowsRepository {
  private items: Follow[] = []

  constructor() {}

  async findByProfileParams(params: FindByProfileParams): Promise<Follow> {
    const follow = this.items.find(
      item => item.following_id === params.following_id
    )

    return follow
  }

  async findAllByProfileParams(params: FindByProfileParams): Promise<Follow[]> {
    const follows = this.items.filter(
      item => item.following_id === params.following_id
    )

    return follows
  }

  async save(follows: Follows): Promise<void> {
    this.items.push(...follows.getNewItems())

    follows.getRemovedItems().forEach(follow => {
      const followIndex = this.items.findIndex(followItem => {
        return followItem.id === follow.id
      })

      this.items.splice(followIndex, 1)
    })
  }

  async create(follows: Follows): Promise<void> {
    this.items.push(...follows.getItems())
  }
}
