import { Name } from '@modules/http/accounts/domain/user/Username';
import { Whitelist } from '@modules/http/player/domain/Whitelist';
import { IAnswerRepository } from '../IAnswerRepository';
import { IWhitelistRepository, SearchResponse } from '../IWhitelistRepository';

export class InMemoryWhitelistRepository implements IWhitelistRepository {
  public items: Whitelist[] = [];

  constructor(private answersRepository?: IAnswerRepository) {}

  async search(
    query: string,
    page: number,
    perPage: number
  ): Promise<SearchResponse> {
    let whiteListList = this.items;

    if (query) {
      whiteListList = this.items.filter(profile => {
        const search = new RegExp(query, 'i');

        return search.test(profile.user.username.value);
      });
    }

    return {
      data: whiteListList.slice((page - 1) * perPage, page * perPage),
      totalCount: whiteListList.length,
    };
  }

  async exists(ident: string): Promise<boolean> {
    const byID = this.items.find(whitelist => whitelist.id === ident);

    if (byID !== undefined) {
      return !!byID;
    }
    const byUserID = this.items.find(whitelist => whitelist.userid === ident);

    if (byUserID !== undefined) {
      return !!byUserID;
    }
  }

  async create(whitelist: Whitelist): Promise<void> {
    this.items.push(whitelist);

    if (this.answersRepository) {
      this.answersRepository.create(whitelist.exam);
    }
  }

  async findOneByID(id: string): Promise<Whitelist> {
    const index = this.items.findIndex(wl => wl.id === id);
    return this.items[index];
  }

  async findOneByUserID(id: string): Promise<Whitelist> {
    return this.items.find(whitelist => whitelist.userid === id);
  }

  async save(whitelist: Whitelist): Promise<void> {
    const whitelistIndex = this.items.findIndex(wl => wl.id === whitelist.id);
    this.items[whitelistIndex] = whitelist;

    if (this.answersRepository) {
      this.answersRepository.save(whitelist.exam);
    }
  }

  async deleteByID(id: string): Promise<void> {
    const whitelistIndex = this.items.findIndex(wl => wl.id === id);
    delete this.items[whitelistIndex];
  }
}
