import { Controller } from '@core/infra/Controller';
import { fail, HttpResponse, ok } from '@core/infra/HttpResponse';
import { SearchProfiles } from './SearchProfiles';

type SearchProfilesControllerRequest = {
  query?: string;
  page?: string;
  per_page?: string;
  randomize?: string;
};

export class SearchProfilesController implements Controller {
  constructor(private searchProfiles: SearchProfiles) {}

  async handle({
    query,
    page,
    per_page,
    randomize,
  }: SearchProfilesControllerRequest): Promise<HttpResponse> {
    try {
      const { data, totalCount } = await this.searchProfiles.execute({
        query,
        page: page ? Number(page) : undefined,
        randomize: randomize === 'true' ? Boolean(randomize) : undefined,
        perPage: per_page ? Number(per_page) : undefined,
      });

      const profiles = data.map(profile => {
        return {
          id: profile.id,
          username: profile.User.username,
          userid: profile.User.id,
          createdAt: profile.User.createdAt,
          role: profile.User.role,
          isPremium: profile.User.isPremium,
          isVerified: profile.User.isVerified,
          avatar: profile.avatar,
          banner: profile.banner,
          description: profile.description,
          nickname: profile.nickname,
          region_city: profile.region_city,
          region_uf: profile.region_uf,
          region_country: profile.region_country,
          badges: profile.badges,
          medals: profile.medals,
          status: profile.status,
          slug: profile.slug,
        };
      });

      return ok({ data: profiles, totalCount });
    } catch (err) {
      return fail(err);
    }
  }
}
