import { Profile } from '@modules/http/social/domain/profiles/Profile'

export type SearchResponse = {
  data: Profile[]
  totalCount: number
}

export interface IProfilesRepository {
  exists(slug: string): Promise<boolean>
  findOne(slug: string): Promise<Profile>
  findAll(): Promise<Profile[]>
  save(slug: Profile): Promise<void>
  search(query: string, page: number, perPage: number): Promise<SearchResponse>
}
