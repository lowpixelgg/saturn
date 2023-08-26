import { Either, left, right } from '@core/logic/Either'
import { IAppointmentsRepository } from '@modules/http/player/repositories/IAppointmentsRepository'
import { AppointmentNotExists } from './errors/AppointmentNotExists'
import * as Discord from '@infra/services/discord'
import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository'
import { AppointmentStaffNotExists } from './errors/AppointmentStaffNotExists'
import { IConnectionsRepository } from '@modules/http/accounts/repositories/IConnectionsRepository'

type ChangeAppointmentStatusRequest = {
  user: { id: string }
  action: string
  appointmentId: string
}

type ChangeAppointmentStatusResponse = Either<
  AppointmentNotExists | AppointmentStaffNotExists,
  any
>

export class ChangeAppointmentStatus {
  constructor(
    private appointmentRepository: IAppointmentsRepository,
    private connectionsRepository: IConnectionsRepository,
    private usersRepository: IUserRepository
  ) {}

  async execute({
    appointmentId,
    user,
    action,
  }: ChangeAppointmentStatusRequest): Promise<ChangeAppointmentStatusResponse> {
    const appointment = await this.appointmentRepository.findById(appointmentId)
    const staff = await this.usersRepository.findOne(user.id)

    if (!appointment) {
      return left(new AppointmentNotExists())
    }

    if (!staff) {
      return left(new AppointmentStaffNotExists())
    }

    const Iuser = await this.usersRepository.findOne(appointment.user_id)

    if (action === 'CHECK_IN') {
      await Discord.REST.sendMessage(
        `**${staff.username.value}** acaba de fazer check-in em uma entrevista com **${Iuser.username.value}**. A entrevista está prestes a começar. :white_check_mark:`,
        process.env.BOT_DISCORD_CHANNEL
      )

      appointment.setAppointmentStatus = 'CHECK_IN'
      await this.appointmentRepository.save(appointment)

      return right(null)
    }

    const connection = await this.connectionsRepository.getByUserAndPlataform(
      Iuser.id,
      'Discord'
    )

    const { access_token, refresh_token } =
      await Discord.OAUTH2.getTokenByRefresh(connection.fallback)

    const member = await Discord.OAUTH2.me(access_token)

    if (action === 'CANCELED') {
      await Discord.REST.sendMessage(
        `**${staff.username.value}** cancelou a reunião com: **${Iuser.username.value}**, deletando a sala e expulsando o membro em alguns segundos. :pleading_face:`,
        process.env.BOT_DISCORD_CHANNEL
      )

      appointment.setAppointmentStatus = 'CANCELED'
      Iuser.setAccountWhitelistStatus = 'APROVADO'
    }

    if (action === 'COMPLETE') {
      await Discord.REST.sendMessage(
        `**${staff.username.value}** completou a reunião com: **${Iuser.username.value}**, deletando a sala e expulsando o membro em alguns segundos. :partying_face:`,
        process.env.BOT_DISCORD_CHANNEL
      )

      appointment.setAppointmentStatus = 'COMPLETE'
    }

    connection.updateFallback = refresh_token

    await this.usersRepository.save(Iuser)
    await this.appointmentRepository.save(appointment)

    await Discord.REST.removeGuildMember(
      member.id,
      process.env.BOT_DISCORD_GUILD,
      access_token
    ).catch(async () => {
      await Discord.REST.sendMessage(
        `Problemas ao remover o usário **${Iuser.username.value}** do grupo com tudo toda via os dados foram salvos.`,
        process.env.BOT_DISCORD_CHANNEL
      )
    })

    await Discord.REST.deleteChannel(appointment.channelId)
    await this.connectionsRepository.saveSingle(connection)

    return right(null)
  }
}
