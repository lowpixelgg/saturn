import { InMemoryProfilesRepository } from '@modules/http/social/repositories/in-memory/InMemoryProfilesRepository';
import { it, describe, expect, beforeEach } from 'vitest';
import { SearchProfiles } from './SearchProfiles';

let profilesRepository: InMemoryProfilesRepository;
let searchProfiles: SearchProfiles;

describe('Search Profiles', () => {
  beforeEach(async () => {
    profilesRepository = new InMemoryProfilesRepository();
    searchProfiles = new SearchProfiles(profilesRepository);
  });

  it('should be able to search profile', async () => {
    const response = await searchProfiles.execute({
      query: '',
    });

    expect(response.data.length).toEqual(2);
    expect(response.totalCount).toEqual(2);
  });

  it('should be able to search through senders', async () => {
    const response = await searchProfiles.execute({
      query: 'jhondoe',
    });

    expect(response.data.length).toEqual(1);
    expect(response.totalCount).toEqual(1);
  });
});
