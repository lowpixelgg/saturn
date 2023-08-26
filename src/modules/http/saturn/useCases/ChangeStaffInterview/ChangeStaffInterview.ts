import { Either, left, right } from '@core/logic/Either'
import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository'
import { IAppointmentsRepository } from '@modules/http/player/repositories/IAppointmentsRepository'
import { IStaffReposiotry } from '../../repositories/IStaffRepository'
import { ChangeStaffInteriviewStaffNotExists } from './errors/ChangeStaffInteriviewStaffNotExists'
import { ChangeStaffIntervieAppointmentNotExists } from './errors/ChangeStaffIntervieAppointmentNotExists'
import * as Discord from '@infra/services/discord'
import { ITokensRepository } from '@modules/http/accounts/repositories/ITokensRepository'
import { ServiceTokenNotFound } from '@modules/http/accounts/useCases/ActivateUser/errors/ServiceTokenNotFound'
import { ServiceTokenNotValid } from '@modules/http/accounts/useCases/ActivateUser/errors/ServiceTokenNotValid'
import { ServiceTokenAlreadyUsed } from '@modules/http/accounts/useCases/ActivateUser/errors/ServiceTokenAlreadyUsed'
import { ServiceTokenExpired } from '@modules/http/accounts/useCases/ActivateUser/errors/ServiceTokenExpired'
import dayjs from 'dayjs'

type ChangeStaffInterviewRequest = {
  user: { id: string }
  tokenId: string
  appointmentId: string
}

type ChangeStaffInterviewResponse = Either<
  | ChangeStaffInteriviewStaffNotExists
  | ChangeStaffIntervieAppointmentNotExists
  | ServiceTokenNotFound
  | ServiceTokenNotValid
  | ServiceTokenAlreadyUsed
  | ServiceTokenExpired,
  boolean
>

export class ChangeStaffInterview {
  constructor(
    private usersRepository: IUserRepository,
    private appointmentRepository: IAppointmentsRepository,
    private staffsRepository: IStaffReposiotry,
    private tokenRepository: ITokensRepository
  ) {}

  async execute({
    user,
    tokenId,
    appointmentId,
  }: ChangeStaffInterviewRequest): Promise<ChangeStaffInterviewResponse> {
    const token = await this.tokenRepository.getById(tokenId)

    if (!token) {
      return left(new ServiceTokenNotFound())
    }

    if (token.type !== 'appointments') {
      console.log(token)
      return left(new ServiceTokenNotValid())
    }

    if (token.used) {
      return left(new ServiceTokenAlreadyUsed())
    }

    if (dayjs().isAfter(dayjs.unix(token.expiresIn))) {
      return left(new ServiceTokenExpired())
    }

    const appointment = await this.appointmentRepository.findById(appointmentId)

    if (!appointment) {
      return left(new ChangeStaffInteriviewStaffNotExists())
    }

    const oldStaff = await this.staffsRepository.findById(appointment.staff_id)
    const staff = await this.staffsRepository.findByUserID(user.id)

    if (!staff) {
      return left(new ChangeStaffIntervieAppointmentNotExists())
    }

    const oldStaffAccount = await this.usersRepository.findOne(oldStaff.user_id)
    const account = await this.usersRepository.findOne(staff.user_id)
    const useraccount = await this.usersRepository.findOne(appointment.user_id)

    appointment.setStaff = staff.id

    await Discord.REST.sendMessage(
      `**${account.username.value}** aceitou substituir **${oldStaffAccount.username.value}** na entrevista de ${useraccount.username.value} :white_check_mark:`,
      process.env.BOT_DISCORD_CHANNEL
    )

    appointment.setAppointmentStatus = 'CHECK_IN'

    token.markHasUsed = true

    await this.tokenRepository.saveSingle(token)
    await this.appointmentRepository.save(appointment)

    return right(true)
  }
}
