import { Comments } from '@modules/http/social/domain/timeline/Comments'
import { Comment } from '@modules/http/social/domain/timeline/Comment'
import ICommentsRepository from '../ICommentsRepository'

export class InMemoryCommentsRepository implements ICommentsRepository {
  private items: Comment[] = []

  constructor() {}

  async create(comments: Comments): Promise<void> {
    this.items.push(...comments.getNewItems())

    comments.getRemovedItems().forEach(comment => {
      const commentIndex = this.items.findIndex(commentItem => {
        return commentItem.id === comment.id
      })

      this.items.splice(commentIndex, 1)
    })
  }

  async save(comments: Comments): Promise<void> {
    this.items.push(...comments.getItems())
  }
}
