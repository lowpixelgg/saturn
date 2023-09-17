import { Roles, Badges, Medals, User } from '@prisma/client';
import { Email } from '../domain/profiles/Email';
import { Follow } from '../domain/profiles/Follow';
import { Name } from '../domain/profiles/Name';

export default interface ProfileDetailsDTO {
  nickname: string;
  User?: User;
  avatar: string;
  banner: string;
  followers: Follow[];
  badges: Badges[];
  medals: Medals[];
  region_city: string;
  region_uf: string;
  follows: Follow[];
  whitelist: string;
  region_country: string;
  status: string;
  description: string;
  youtube: string;
  twitch: string;
  instagram: string;
  slug: string;
}
