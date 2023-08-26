import schedule from '@infra/libs/schedule/schedule'
import dayjs from 'dayjs'
import * as Discord from '@infra/services/discord'
import Queue from '@infra/libs/Queue/bull'
import { PrismaAppointmentsRepository } from '../../repositories/prisma/PrismaAppointmentsRepository'
import { PrismaUserRepository } from '@modules/http/accounts/repositories/prisma/PrismaUserRepository'
import { interview } from '@infra/libs/discord/webhooks'
import { Token } from '@modules/http/accounts/domain/user/Token'
import { PrismaTokensRepository } from '@modules/http/accounts/repositories/prisma/PrismaTokensRepository'
import { PrismaConnectionsRepository } from '@modules/http/accounts/repositories/prisma/PrismaConnectionsRepository'
import { AppointmentMapper } from '../../mappers/AppointmentMapper'
import { PrismaStaffRepository } from '@modules/http/saturn/repositories/prisma/PrismaStaffRepository'

export default {
  key: 'InterviewAppointment',
  options: {
    delay: 5000,
  },
  async handle({ data }) {
    const tokensRepository = new PrismaTokensRepository()
    const staffsRepository = new PrismaStaffRepository()
    const appointmentsRepository = new PrismaAppointmentsRepository()
    const usersRepository = new PrismaUserRepository(
      null,
      null,
      tokensRepository
    )
    const connectionsRepository = new PrismaConnectionsRepository()

    const main = dayjs.unix(data.appointment.props.date)
    const toSendAlert = main.subtract(10, 'minutes').toDate()
    const toFindNewStaff = main.add(5, 'minutes').toDate()

    let accessToken = null
    let member = null

    const appointment = await appointmentsRepository.findByUser(data.userId)

    const user = await usersRepository.findOne(data.userId)
    const findStaff = await staffsRepository.findById(
      data.appointment.props.staff_id
    )

    const staff = await usersRepository.findOne(findStaff.user_id)

    if (!user || !staff) {
      return false
    }

    console.log('its here')

    schedule.scheduleJob(toSendAlert, async () => {
      const connection = await connectionsRepository.getByUserAndPlataform(
        user.id,
        'Discord'
      )

      if (!connection) {
        return false
      }

      const { access_token, refresh_token } =
        await Discord.OAUTH2.getTokenByRefresh(connection.fallback)

      if (access_token && refresh_token) {
        connection.updateFallback = refresh_token
        accessToken = access_token
        member = await Discord.OAUTH2.me(access_token)

        await connectionsRepository.saveSingle(connection)
      } else {
        return false
      }

      const message = `Hey ${
        user.username.value
      } tudo bem? faço parte do time da Rocket. Sou responsável pelas entrevistas e serei seu agenciador hoje. Antes de começarmos, gostaria de informar que sua entrevista ocorrerá em alguns minutos, precisamente às ${main
        .get('hour')
        .toString()} horas. Decidi chamar você agora para explicar como funcionará. Já adicionei você no grupo das entrevistas e a chamada foi criada. Entretanto, você só poderá entrar na chamada no horário exato, certo? Antes de conectar, por favor, leia a sala leia-me no grupo para que você não seja desclassificado. 🤝`

      await Discord.REST.addGuildMember(
        member.id,
        process.env.BOT_DISCORD_GUILD,
        access_token
      )

      await Discord.REST.sendPrivateMessage(message, member.id).catch(
        async () => {
          await Queue.add('AppointmentAlertMail', {
            email: user.email.value,
            username: user.username.value,
            message,
          })
        }
      )

      // Create Channel at Categories
      const channel = await Discord.REST.channelCreate(user.username.value)

      await Discord.REST.sendMessage(
        `<@${member.id}> acabou de entrar no grupo e está aguardando por sua entrevista que começa em **10 minutos** com **${staff.username.value}** :smirk_cat:`,
        process.env.BOT_DISCORD_CHANNEL
      )

      appointment.setChannelId = channel.id
      await appointmentsRepository.save(appointment)
    })

    // Hora da entrevista 💘
    schedule.scheduleJob(main.toDate(), async () => {
      const appointment = await appointmentsRepository.findByUser(data.userId)

      await Discord.REST.channelEditPerms(appointment.channelId, member.id)

      await Discord.REST.sendMessage(
        `Sala de entrevista (<#${appointment.channelId}>) liberada para <@${member.id}>, esperando por ${staff.username.value} efetuar o check-in no console. :warning:`,
        process.env.BOT_DISCORD_CHANNEL
      )

      const message = `Chegou a hora! Entre nesta sala (<#${appointment.channelId}>) para dar início à sua entrevista. Se por acaso o entrevistador ainda não estiver presente, aguarde. Se, por algum imprevisto, ele não aparecer, sua sala será automaticamente excluída e sua whitelist poderá ser reagendada no site sem timeout. Tenha uma ótima entrevista e boa sorte!`
      await Discord.REST.sendPrivateMessage(message, member.id).catch(
        async () => {
          await Queue.add('AppointmentReadyMail', {
            email: user.email.value,
            username: user.username.value,
            channelId: appointment.channelId,
          })
        }
      )
    })

    // Se por acaso o orador não aparecer...
    schedule.scheduleJob(toFindNewStaff, async () => {
      const appointment = await appointmentsRepository.findByUser(data.userId)

      if (
        appointment.status !== 'CHECK_IN' &&
        appointment.status !== 'CANCELED'
      ) {
        await Discord.REST.sendMessage(
          `<@${member.id}> o orador(**${staff.username.value}**) não fez check-in a tempo. Aguarde enquanto chamamos um substituto. :expressionless:`,
          process.env.BOT_DISCORD_CHANNEL
        )

        const account = await usersRepository.findOne(appointment.user_id)
        const token = Token.create({
          type: 'appointments',
          expiresIn: dayjs().add(10, 'minutes').unix(),
          user_id: appointment.user_id,
        })

        const toFinishWithOutStaff = dayjs(toFindNewStaff)
          .add(10, 'minutes')
          .toDate()

        appointment.setDate = dayjs().add(5, 'minutes').unix()
        appointment.setAppointmentStatus = 'RISK_ALERT'

        account.addToken(token)
        await usersRepository.save(account)
        await appointmentsRepository.save(appointment)

        interview.send(
          `<@&${process.env.BOT_DISCORD_ROLE_SUPPORT}> **${account.username.value}** está precisando de um orador clique em: **https://console.rocketmta.com/console/appointments/${appointment.id}/${token.id}**`
        )

        schedule.scheduleJob(toFinishWithOutStaff, async () => {
          const appointment = await appointmentsRepository.findByUser(
            data.userId
          )

          if (appointment.status === 'RISK_ALERT') {
            const account = await usersRepository.findOne(appointment.user_id)

            account.setAccountWhitelistStatus = 'APROVADO'
            await usersRepository.save(account)

            appointmentsRepository.deleteById(appointment.id)

            await Discord.REST.sendMessage(
              `<@${member.id}> Nenhum orador apareceu a tempo para esta entrevista. Leia as informações enviadas ao seu DM/Email. :expressionless:`,
              process.env.BOT_DISCORD_CHANNEL
            )

            await Discord.REST.deleteChannel(appointment.channelId).catch(
              async () =>
                await Discord.REST.sendMessage(
                  `Houve um problema ao deletar a sala de: <@${member.id}> por favor, @everyone. Delete para manter o grupo limpo. 😊`,
                  process.env.BOT_DISCORD_CHANNEL
                )
            )

            await Discord.REST.sendPrivateMessage(
              `Hey Buddy, parece que o staff (${staff.username.value}) não compareceu ao compromisso e pedimos as mais sinceras desculpas por isso! Bom, não se preocupe, não vamos aplicar um timeout e você pode ir correndo até a plataforma para marcar um novo horário. Mais uma vez, desculpe pelo ocorrido. :sob:`,
              member.id
            )

            Discord.REST.removeGuildMember(
              member.id,
              process.env.BOT_DISCORD_GUILD,
              accessToken
            ).catch(async () => {
              await Discord.REST.sendMessage(
                `Houve um problema ao remover o membro: <@${member.id}> do grupo! Por favor, @everyone. Alguem pode remover o membro para manter o grupo limpo? 😊`,
                process.env.BOT_DISCORD_CHANNEL
              )
            })
          }
        })
      }
    })
  },
}
