import { Post } from '../domain/timeline/Post';

export type SearchResponse = {
  data: Post[];
  totalCount: number;
};

export interface IPostsRepository {
  exists(postId: string): Promise<boolean>;
  findOne(postId: string): Promise<Post>;
  findAll(): Promise<Post[]>;
  save(raw: Post): Promise<void>;
  create(post: Post): Promise<void>;
  search(query: string, page: number, perPage: number): Promise<SearchResponse>;
  engressUserFeed(
    followUpIds: string[],
    query: string,
    page: number,
    perPage: number
  ): Promise<SearchResponse>;
  delete(raw: Post): Promise<void>;
}
