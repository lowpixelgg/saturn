import { IProfilesRepository } from '@modules/http/social/repositories/IProfilesRepository';
import { Profile } from '@modules/http/social/domain/profiles/Profile';
import { ProfileMapper } from '@modules/http/social/mappers/ProfileMapper';

type SearchProfilesRequest = {
  query?: string;
  page?: number;
  perPage?: number;
  randomize?: boolean;
};

type SearchProfilesResponse = {
  data: Profile[];
  totalCount: number;
};

export class SearchProfiles {
  constructor(private profilesRespository: IProfilesRepository) {}

  async execute({
    query,
    page = 1,
    perPage = 20,
    randomize = false,
  }: SearchProfilesRequest): Promise<SearchProfilesResponse> {
    const { data, totalCount } = await this.profilesRespository.search(
      query,
      page,
      perPage,
      randomize
    );

    return { data, totalCount };
  }
}
