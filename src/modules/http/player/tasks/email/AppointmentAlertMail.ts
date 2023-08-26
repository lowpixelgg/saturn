import Mail from '@infra/libs/nodemailer/nodemailer'
import { AppointmentAlertTemplate } from '@templates/AppointmentTemplates/AppointmentAlertTemplate'

export default {
  key: 'AppointmentAlertMail',
  options: {
    delay: 5000,
  },

  async handle({ data }) {
    await Mail.sendMail({
      from: 'Rocket Roleplay <noreply@rocketmta.com>',
      to: `${data.username} <${data.email}>`,
      subject: 'A sua entrevista começa em 10 minutos.',
      html: AppointmentAlertTemplate(data.message),
    })
  },
}
