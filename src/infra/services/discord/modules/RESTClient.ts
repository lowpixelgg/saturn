import rest from '@infra/libs/discord/discordjs';
import { Routes } from 'discord-api-types/v10';
import { Client } from 'discord.js';
import constants from '@configs/constants/discord';
import { reject } from 'lodash';

export default class RESTClient {
  static async channelCreate(com: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const channel = await rest.post(
          Routes.guildChannels(process.env.BOT_DISCORD_GUILD),
          {
            body: {
              name: 'Entrevista: ' + com,
              type: constants.interview_channelType,
              parent_id: constants.parent_category,
              user_limit: 2,
              permission_overwrites: [
                {
                  id: process.env.BOT_DISCORD_GUILD,
                  type: 0,
                  allow: '1024',
                  deny: '1048576',
                },
              ],
            },
          }
        );

        return resolve(channel);
      } catch (error) {
        return reject(error);
      }
    });
  }

  static async channelEditPerms(channelId: string, userId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        await rest.put(Routes.channelPermission(channelId, userId), {
          body: {
            type: 1,
            allow: '1048576',
            deny: '0',
          },
        });

        return resolve(true);
      } catch (error) {
        return reject(error);
      }
    });
  }

  static async sendPrivateMessage(message: string, userId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const channel = (await rest.post(Routes.userChannels(), {
          body: {
            recipient_id: userId,
          },
        })) as any;

        await rest.post(Routes.channelMessages(channel.id), {
          body: {
            content: message,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        return resolve(channel);
      } catch (error) {
        return reject(error);
      }
    });
  }

  static async deleteChannel(channelId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        await rest.delete(Routes.channel(channelId));

        return resolve(true);
      } catch (error) {
        return reject(error);
      }
    });
  }

  static async getMemberGuild(guildId: string, userId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await rest.get(Routes.guildMember(guildId, userId));

        return resolve(user);
      } catch (error) {
        return reject(error);
      }
    });
  }

  static async prepare(client: Client) {
    client.login(process.env.BOT_DISCORD_TOKEN);
  }

  static async sendMessage(message: string, channelId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const msg = await rest.post(Routes.channelMessages(channelId), {
          body: {
            content: message,
          },
        });

        return resolve(msg);
      } catch (error) {
        return reject(error);
      }
    });
  }

  static async addGuildMember(
    userId: string,
    guild_id: string,
    access_token: string
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const guild = await rest.put(Routes.guildMember(guild_id, userId), {
          body: {
            access_token,
          },
        });

        return resolve(guild);
      } catch (error) {
        return reject(error);
      }
    });
  }

  static async removeGuildMember(
    userId: string,
    guild_id: string,
    access_token: string
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const guild = await rest.delete(Routes.guildMember(guild_id, userId), {
          body: {
            access_token,
          },
        });

        return resolve(guild);
      } catch (error) {
        return reject(error);
      }
    });
  }

  static async addGuildMemberRole(
    guildId: string,
    userId: string,
    roleId: string
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const role = await rest.put(
          Routes.guildMemberRole(guildId, userId, roleId)
        );

        return resolve(role);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
