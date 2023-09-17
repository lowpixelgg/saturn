import { WatchedList } from '@core/domain/WatchedList';

import { Comment } from './Comment';

export class Comments extends WatchedList<Comment> {
  private constructor(comments: Comment[]) {
    super(comments);
  }

  public compareItems(a: Comment, b: Comment): boolean {
    return a.equals(b);
  }

  public static create(comments?: Comment[]): Comments {
    return new Comments(comments || []);
  }
}
