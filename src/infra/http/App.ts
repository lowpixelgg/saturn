import cors from 'cors';
import express from 'express';
import { Router } from './routes/index';
import Queue from '@infra/libs/Queue/bull';
import { Client, GatewayIntentBits } from 'discord.js';
import { prisma } from '@infra/prisma/prisma-client';
import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository';
import { IConnectionsRepository } from '@modules/http/accounts/repositories/IConnectionsRepository';
import * as Discord from '@infra/services/discord';
import { PrismaUserRepository } from '@modules/http/accounts/repositories/prisma/PrismaUserRepository';
import { PrismaConnectionsRepository } from '@modules/http/accounts/repositories/prisma/PrismaConnectionsRepository';
import { AppointmentMapper } from '@modules/http/player/mappers/AppointmentMapper';
import log from '@vendor/log';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import * as namespaces from '@modules/ws/index';

class Saturn {
  public app: express.Application;
  public io: Server;
  public server: any;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    Queue.process();

    /*
      Propagate the middlewares
    */
    this.middlewares();
    this.upcomingAppointments(
      new PrismaUserRepository(),
      new PrismaConnectionsRepository()
    );
    this.setupSocket();

    /*
      Discord up
    */

    const bot = new Client({
      intents: [GatewayIntentBits.Guilds],
    });

    Discord.REST.prepare(bot).then(() => {
      log.success('Modules: discord has been loaded');
    });
  }

  private middlewares(): void {
    this.app.use(
      cors({
        exposedHeaders: ['x-total-count', 'Content-Type', 'Content-Length'],
      })
    );

    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json({ type: ['application/json', 'text/plain'] }));
    this.app.use(Router);
  }

  private setupSocket() {
    Object.values(namespaces).map(namespace => new namespace(this.io));
  }

  private upcomingAppointments(
    usersRepository: IUserRepository,
    connectionsRepository: IConnectionsRepository
  ): void {
    prisma.appointments
      .findMany({
        where: {
          status: 'WAITING',
        },
      })
      .then(data => {
        if (data.length < 1) {
          return false;
        }

        data.map(async appointment => {
          const user = await usersRepository.findOne(appointment.user_id);

          if (user) {
            const connection =
              await connectionsRepository.getByUserAndPlataform(
                user.id,
                'Discord'
              );

            if (connection) {
              try {
                const { access_token, refresh_token } =
                  await Discord.OAUTH2.getTokenByRefresh(connection.fallback);
                connection.updateFallback = refresh_token;

                await Queue.add('InterviewAppointment', {
                  userId: user.id,
                  appointment: AppointmentMapper.toDomain(appointment),
                });

                await connectionsRepository.saveSingle(connection);

                await Discord.REST.sendMessage(
                  `**SCHEDULE OF**: ${user.username.value} WAS RECOVERED SUCCESSFULLY. :evergreen_tree:`,
                  process.env.BOT_DISCORD_CHANNEL
                );
              } catch (error) {
                await Discord.REST.sendMessage(
                  `**SCHEDULE OF**: ${user.username.value} HAS ERRORS :red_circle:`,
                  process.env.BOT_DISCORD_CHANNEL
                );
              }
            } else {
              await Discord.REST.sendMessage(
                `**SCHEDULE OF**: ${user.username.value} HAS ERRORS :red_circle:`,
                process.env.BOT_DISCORD_CHANNEL
              );

              return false;
            }
          }
        });
      });
  }
}

export default new Saturn().server;
