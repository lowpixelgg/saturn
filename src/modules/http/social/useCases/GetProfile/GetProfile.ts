import { Either, left, right } from '@core/logic/Either';
import { ProfileDoesNotExist } from './errors/ProfileDoesNotExist';
import { IProfilesRepository } from '@modules/http/social/repositories/IProfilesRepository';

type GetProfileResponse = object;
type GetProfileDetails = Either<ProfileDoesNotExist, GetProfileResponse>;

export class GetProfile {
  constructor(private profilesRepository: IProfilesRepository) {}

  async execute({ ident, user }): Promise<GetProfileDetails> {
    const exists = await this.profilesRepository.exists(ident);

    if (!exists) {
      return left(new ProfileDoesNotExist());
    }

    const profile = await this.profilesRepository.findOne(ident);

    const requestUser = await this.profilesRepository.findOne(user.id);

    const userfollows = requestUser.following as object[];

    const isFollowing = userfollows.find(
      (follow: any) => follow.followers_id === profile.User.id
    );

    const {
      avatar,
      banner,
      User,
      description,
      nickname,
      region_city,
      region_country,
      region_uf,
      badges,
      medals,
      status,
      following,
      followers,
      slug,
      youtube,
      twitch,
      whitelist,
      instagram,
    } = profile;

    delete User.password;
    delete User.email;

    return right({
      ...User,
      avatar,
      banner,
      description,
      nickname,
      following,
      followers,
      region_city,
      region_country,
      whitelist,
      region_uf,
      badges,
      medals,
      status,
      youtube,
      twitch,
      instagram,
      isFollowing: Boolean(isFollowing) ? Boolean(isFollowing) : false,
      slug,
    });
  }
}
