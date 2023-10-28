import { Whitelist } from '../domain/Whitelist';

export type SearchResponse = {
  data: Whitelist[];
  totalCount: number;
};

export interface IWhitelistRepository {
  exists(ident: string): Promise<boolean>;
  create(whitelist: Whitelist): Promise<void>;
  findOneByID(id: string): Promise<Whitelist>;
  findOneByUserID(id: string): Promise<Whitelist>;
  save(whitelist: Whitelist): Promise<void>;
  deleteByID(id: string): Promise<void>;
  search(query: string, page: number, perPage: number): Promise<SearchResponse>;
}
