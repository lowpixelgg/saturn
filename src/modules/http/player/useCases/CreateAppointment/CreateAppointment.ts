import { Either, left, right } from '@core/logic/Either'
import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository'
import { Appointment } from '../../domain/Appointment'
import { IAppointmentsRepository } from '../../repositories/IAppointmentsRepository'
import { CreateAppointmentConnError } from './errors/CreateAppointmentConnError'
import { CreateAppointmentUserNotFound } from './errors/CreateAppointmentUserNotFound'
import Queue from '@infra/libs/Queue/bull'
import * as Discord from '@infra/services/discord'
import { IConnectionsRepository } from '@modules/http/accounts/repositories/IConnectionsRepository'
import dayjs from 'dayjs'
import { ITimesRepository } from '@modules/http/saturn/repositories/ITimesRepository'
import { CreateAppointmentTimeNotFound } from './errors/CreateAppointmentTimeNotFound'
import { IStaffReposiotry } from '@modules/http/saturn/repositories/IStaffRepository'
import { CreateAppointmentTimeAlreadyInUse } from './errors/CreateAppointmentTimeAlreadyInUse'

type CreateAppointmentRequest = {
  user: { id: string }
  timeId: string
  name: string
  observation: string
}

type CreateAppointmentResponse = Either<
  | CreateAppointmentUserNotFound
  | CreateAppointmentConnError
  | CreateAppointmentTimeNotFound
  | CreateAppointmentTimeAlreadyInUse,
  any
>

export class CreateAppointment {
  constructor(
    private usersRepository: IUserRepository,
    private timesRepository: ITimesRepository,
    private staffRepository: IStaffReposiotry,
    private connectionsRepository: IConnectionsRepository,
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  async execute({
    user,
    timeId,
    name,
    observation,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const time = await this.timesRepository.getWeekTimeById(timeId)

    if (!time) {
      return left(new CreateAppointmentTimeNotFound())
    }

    if (time.scheduled) {
      return left(new CreateAppointmentTimeAlreadyInUse())
    }

    const account = await this.usersRepository.findOne(user.id)

    if (!account) {
      return left(new CreateAppointmentUserNotFound())
    }

    const existsAppointment = await this.appointmentsRepository.findByUser(
      account.id
    )

    if (existsAppointment) {
      await this.appointmentsRepository.deleteById(existsAppointment.id)
    }

    const connection = await this.connectionsRepository.getByUserAndPlataform(
      account.id,
      'Discord'
    )

    if (!connection) {
      return left(new CreateAppointmentConnError())
    }

    const staff = await this.staffRepository.findById(time.staff_id)

    if (!staff) {
      return left(new CreateAppointmentUserNotFound())
    }

    const { username } = await this.usersRepository.findOne(staff.user_id)

    const toUnix = dayjs.unix(dayjs(time.date).unix())

    const appointment = Appointment.create({
      date: toUnix.unix(),
      staff_id: staff.id,
      name: name,
      observation,
      user_id: account.id,
    })

    try {
      const { access_token, refresh_token } =
        await Discord.OAUTH2.getTokenByRefresh(connection.fallback)

      const member = await Discord.OAUTH2.me(access_token)

      connection.updateFallback = refresh_token
      account.setAccountWhitelistStatus = 'WAITING'
      account.setAccountWhitelistTimeout = null
      time.setScheduled = true

      await Queue.add('InterviewAppointment', {
        userId: user.id,
        appointment: appointment,
      })

      await Discord.REST.sendMessage(
        `<@${member.id}> agendou uma entrevista para: **${toUnix.format(
          'DD/MM/YYYY'
        )}** ás **${toUnix.get('hour')}:${toUnix.get('minute')}** com **${
          username.value
        }** :gun:`,
        process.env.BOT_DISCORD_CHANNEL
      )

      await this.usersRepository.save(account)
      await this.timesRepository.saveSingle(time)
      await this.connectionsRepository.saveSingle(connection)
      await this.appointmentsRepository.create(appointment)
    } catch (error) {
      return left(new CreateAppointmentConnError())
    }
    return right(null)
  }
}
