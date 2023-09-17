import { Either, left, right } from '@core/logic/Either';
import { Connection } from '@modules/http/accounts/domain/user/Connection';
import { IConnectionsRepository } from '@modules/http/accounts/repositories/IConnectionsRepository';
import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository';
import { DiscordConnectionAccountNotFound } from './errors/DiscordConnectionAccountNotFound';
import { DiscordConnectionAlreadySync } from './errors/DiscordConnectionAlreadySync';
import { DiscordConnectionRequestError } from './errors/DiscordConnectionRequestError';
import * as Discord from '@infra/services/discord';
import { DiscordConnectionNotAvailable } from './errors/DiscordConnectionNotAvailable';
import constants from '@configs/constants/discord';

type DiscordConnectionRequest = {
  user: { id: string };
  code: string;
};

type DiscordConnectionRequestResponse = Either<
  | DiscordConnectionRequestError
  | DiscordConnectionAccountNotFound
  | DiscordConnectionNotAvailable
  | DiscordConnectionAlreadySync,
  boolean
>;

export class DiscordConnection {
  constructor(
    private usersRepository: IUserRepository,
    private connectionsRepository: IConnectionsRepository
  ) {}

  async execute({
    code,
    user,
  }: DiscordConnectionRequest): Promise<DiscordConnectionRequestResponse> {
    const account = await this.usersRepository.findOne(user.id);

    if (!account) {
      return left(new DiscordConnectionAccountNotFound());
    }

    const exists = await this.connectionsRepository.getByUserAndPlataform(
      account.id,
      'Discord'
    );

    if (exists) {
      return left(new DiscordConnectionAlreadySync());
    }

    const { access_token, refresh_token } = await Discord.OAUTH2.getTokenByCode(
      code
    );

    if (!access_token) {
      return left(new DiscordConnectionRequestError());
    }

    // const member = await Discord.OAUTH2.me(access_token)

    // try {
    //   const guildMember = (await Discord.REST.getMemberGuild(
    //     process.env.BOT_DISCORD_GUILD_ROCKET,
    //     member.id
    //   )) as { roles: string[] }

    //   const findMemberRoles = guildMember.roles.some(id =>
    //     constants.accepted.includes(id)
    //   )

    //   if (!findMemberRoles) {
    //     return left(new DiscordConnectionNotAvailable())
    //   }
    // } catch (error) {
    //   return left(new DiscordConnectionNotAvailable())
    // }

    const connection = Connection.create({
      plataform: 'Discord',
      fallback: refresh_token,
      user_id: user.id,
    });

    account.addConnection(connection);
    await this.usersRepository.save(account);

    return right(true);
  }
}
