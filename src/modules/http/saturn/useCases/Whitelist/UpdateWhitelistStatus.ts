import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository';
import { Whitelist } from '@modules/http/player/domain/Whitelist';
import { IWhitelistRepository } from '@modules/http/player/repositories/IWhitelistRepository';
import { Either, left, right } from '@core/logic/Either';
import { WhitelistDataMalformated } from './error/WhitelistDataMalformated';
import { WhitelistDoesNotExist } from './error/WhitelistDoesNotExist';
import { WhitelistMentiondUseNotExist } from './error/WhitelistMentiondUseNotExist';
import Queue from '@infra/libs/Queue/bull';
import dayjs from 'dayjs';
import { Notification } from '@modules/http/accounts/domain/user/Notification';
import { WhitelistApprovedTemplate } from '@templates/NotificationMarkupTemplates/WhitelistApprovedTemplate';
import { WhitelistReprovedTemplate } from '@templates/NotificationMarkupTemplates/WhitelistReprovedTemplate';
import * as Discord from '@infra/services/discord';
import { IConnectionsRepository } from '@modules/http/accounts/repositories/IConnectionsRepository';
import { WhitelistReprovadoEntrevistaTemplate } from '@templates/NotificationMarkupTemplates/WhitelistReprovadoEntrevista';
import { WhitelistEntrevistadoTemplate } from '@templates/NotificationMarkupTemplates/WhitelistEntrevistadoTemplate';
import { WhitelistCustomError } from './error/WhitelistCustomError';

type UpdateWhitelistRequest = {
  id: string;
  mention: string;
  status: string;
};

type UpdateWhitelistResponse = Either<
  | WhitelistDoesNotExist
  | WhitelistMentiondUseNotExist
  | WhitelistDataMalformated
  | WhitelistCustomError,
  Whitelist
>;

export class UpdateWhitelistStatus {
  constructor(
    private whitelistRepository: IWhitelistRepository,
    private connectionsRepository: IConnectionsRepository,
    private usersRepository: IUserRepository
  ) {}

  async execute({
    id,
    mention,
    status,
  }: UpdateWhitelistRequest): Promise<UpdateWhitelistResponse> {
    const exists = await this.whitelistRepository.exists(id);

    if (!exists) {
      return left(new WhitelistDoesNotExist());
    }

    const staff = await this.usersRepository.findOne(mention);

    if (!staff) {
      return left(new WhitelistMentiondUseNotExist());
    }

    const whitelist = await this.whitelistRepository.findOneByID(id);

    if (!mention || !status) {
      return left(new WhitelistDataMalformated());
    }

    const userAccount = await this.usersRepository.findOne(whitelist.user.id);

    if (status === userAccount.status) {
      return right(whitelist);
    }

    if (status === 'REPROVADO') {
      userAccount.setAccountWhitelistStatus = 'REPROVADO';
      userAccount.setAccountWhitelistTimeout = dayjs().add(12, 'hours').unix();
    }

    if (status === 'APROVADO') {
      userAccount.setAccountWhitelistStatus = 'APROVADO';
    }

    if (status === 'ARQUIVADO') {
      userAccount.setAccountWhitelistStatus = userAccount.status;
    }

    if (status === 'ENTREVISTADO') {
      const connection = await this.connectionsRepository.getByUserAndPlataform(
        userAccount.id,
        'Discord'
      );

      try {
        const { access_token, refresh_token } =
          await Discord.OAUTH2.getTokenByRefresh(connection.fallback);

        const member = await Discord.OAUTH2.me(access_token);

        userAccount.setAccountWhitelistStatus = 'ENTREVISTADO';
        connection.updateFallback = refresh_token;

        await Discord.REST.addGuildMember(
          member.id,
          process.env.BOT_DISCORD_GUILD_CITY,
          access_token
        );

        await Discord.REST.addGuildMember(
          member.id,
          process.env.BOT_DISCORD_GUILD_MAIN,
          access_token
        );

        await Discord.REST.addGuildMemberRole(
          process.env.BOT_DISCORD_GUILD_ROCKET,
          member.id,
          process.env.BOT_DISCORD_ROCKET_APPOINTMENT_OK
        );

        await this.connectionsRepository.saveSingle(connection);
      } catch (error) {
        return left(new WhitelistCustomError(error));
      }

      // Add Member to group
    }

    if (status === 'REPROVADO_ENTREVISTA') {
      userAccount.setAccountWhitelistStatus = 'REPROVADO_ENTREVISTA';
      userAccount.setAccountWhitelistTimeout = dayjs().add(2, 'days').unix();
    }

    const message = (status: string) => {
      switch (status) {
        case 'APROVADO':
          return {
            small:
              'Parabéns!! Você foi aprovado na whitelist, clique para saber mais',
            content: WhitelistApprovedTemplate(userAccount.username.value),
          };
        case 'REPROVADO':
          return {
            small:
              'Uma mensagem acaba de chegar do centro de controle, clique aqui para ler esta mensagem!',
            content: WhitelistReprovedTemplate(userAccount.username.value),
          };

        case 'REPROVADO_ENTREVISTA':
          return {
            small:
              'Parece que você foi reprovado na entreviste, clique para ler mais.',
            content: WhitelistReprovadoEntrevistaTemplate(
              userAccount.username.value
            ),
          };

        case 'ENTREVISTADO':
          return {
            small:
              'Ihuuu, você foi aprovado na entrevista, clique para saber mais.',
            content: WhitelistEntrevistadoTemplate(userAccount.username.value),
          };
      }
    };

    const notify = Notification.create({
      read: false,
      small: message(status).small,
      content: message(status).content,
      userid: whitelist.user.id,
    });

    userAccount.addNotification(notify);

    await this.usersRepository.save(userAccount);

    whitelist.setWhitelistStatus = status;
    whitelist.setStaffWhitelist = staff.id;

    await Queue.add('WhitelistChangeEmail', {
      name: whitelist.user.username.value,
      email: whitelist.user.email.value,
    });

    await this.whitelistRepository.save(whitelist);

    return right(whitelist);
  }
}
