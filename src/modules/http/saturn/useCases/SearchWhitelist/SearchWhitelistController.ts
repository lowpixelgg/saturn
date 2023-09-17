import { Controller } from '@core/infra/Controller';
import { fail, HttpResponse, ok } from '@core/infra/HttpResponse';
import { SearchWhitelist } from './SearchWhitelist';

type SearchWhitelistControllerRequest = {
  query?: string;
  page?: string;
  per_page?: string;
};

export class SearchWhitelistController implements Controller {
  constructor(private searchWhitelist: SearchWhitelist) {}

  async handle({
    query,
    page,
    per_page,
  }: SearchWhitelistControllerRequest): Promise<HttpResponse> {
    try {
      const { data, totalCount } = await this.searchWhitelist.execute({
        query,
        page: page ? Number(page) : undefined,
        perPage: per_page ? Number(per_page) : undefined,
      });

      const whitelists = data.map(whitelist => {
        return {
          id: whitelist.id,
          status: whitelist.status,
          createdAt: whitelist.createdAt,
          staff_id: whitelist.staff_id,
          username: whitelist.user.username.value,
          avatar: whitelist.user.Profile.avatar,
        };
      });

      return ok({ data: whitelists, totalCount });
    } catch (err) {
      return fail(err);
    }
  }
}
