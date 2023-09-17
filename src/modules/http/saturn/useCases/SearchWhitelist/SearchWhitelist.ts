import { Whitelist } from '@modules/http/player/domain/Whitelist';
import { IWhitelistRepository } from '@modules/http/player/repositories/IWhitelistRepository';
import { PrismaWhitelistRepository } from '@modules/http/player/repositories/prisma/PrismaWhitelistRepository';

type SearchWhitelistRequest = {
  query?: string;
  page?: number;
  perPage?: number;
};

type SearchWhitelistResponse = {
  data: Whitelist[];
  totalCount: number;
};

export class SearchWhitelist {
  constructor(private whitelistRepository: IWhitelistRepository) {}

  async execute({
    query,
    page = 1,
    perPage = 20,
  }: SearchWhitelistRequest): Promise<SearchWhitelistResponse> {
    const { data, totalCount } = await this.whitelistRepository.search(
      query,
      page,
      perPage
    );

    return { data, totalCount };
  }
}
