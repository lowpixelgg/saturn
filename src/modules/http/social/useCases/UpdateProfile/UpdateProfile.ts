import { Either, left, right } from '@core/logic/Either';
import { ProfileUpdateUserNotFound } from './errors/ProfileUpdateUserNotFound';
import { ProfileUpdateDataMalformated } from './errors/ProfileUpdateDataMalformated';
import { IProfilesRepository } from '@modules/http/social/repositories/IProfilesRepository';
import { ProfileSlugAlreadyInUse } from './errors/ProfileSlugAlreadyInUse';
import { ProfileUpdateActionRequired } from './errors/ProfileUpdateActionRequired';
import { UserIsNotPremium } from './errors/UserIsNotPremium';

type UpdateProfileRequest = {
  user: { id: string };
  description?: string;
  nickname?: string;
  status?: string;
  region_city?: string;
  region_uf?: string;
  region_country?: string;
  youtube?: string;
  twitch?: string;
  instagram?: string;
  slug?: string;
  action: string;
};

type UpdaProfileResponse = Either<
  | ProfileUpdateUserNotFound
  | ProfileSlugAlreadyInUse
  | ProfileUpdateDataMalformated
  | ProfileUpdateActionRequired,
  boolean
>;

export class UpdateProfile {
  constructor(private profilesRepository: IProfilesRepository) {}

  async execute({
    action,
    user,
    description,
    nickname,
    status,
    region_city,
    region_uf,
    region_country,
    youtube,
    twitch,
    instagram,
    slug,
  }: UpdateProfileRequest): Promise<UpdaProfileResponse> {
    if (!action) {
      return left(new ProfileUpdateActionRequired());
    }

    const profile = await this.profilesRepository.findOne(user.id);

    if (!profile) {
      return left(new ProfileUpdateUserNotFound());
    }

    if (action === 'update:bio') {
      profile.setYoutube = youtube ? youtube : null;

      if (profile.user.isPremium !== false) {
        profile.setTwitch = twitch ? twitch : null;
        profile.setInstagram = instagram ? instagram : null;
        profile.setDescription = description ? description : null;
      } else {
        return left(new UserIsNotPremium());
      }
    }

    if (action === 'update:social') {
      profile.setNickname = nickname;
      profile.setRegion_city = region_city ? region_city : null;
      profile.setRegion_uf = region_uf ? region_uf : null;
      profile.setRegion_country = region_country ? region_country : null;
      profile.seStatus = status ? status : null;

      if (slug !== profile.slug) {
        const exists = await this.profilesRepository.exists(slug);

        if (exists) {
          return left(new ProfileSlugAlreadyInUse());
        }

        if (profile.user.isPremium !== false) {
          profile.setSlug = slug;
        } else {
          return left(new UserIsNotPremium());
        }
      }
    }

    await this.profilesRepository.save(profile);
    return right(true);
  }
}
