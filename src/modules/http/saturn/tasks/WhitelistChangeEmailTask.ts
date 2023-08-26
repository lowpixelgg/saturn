import Mail from '@infra/libs/nodemailer/nodemailer'
import { WhitelistChangeStatus } from '@templates/EmailTemplates/WhitelistChangeStatus'

export default {
  key: 'WhitelistChangeEmail',
  options: {
    delay: 5000,
  },

  async handle({ data }) {
    await Mail.sendMail({
      from: 'Rocket Roleplay <noreply@rocketmta.com>',
      to: `${data.name} <${data.email}>`,
      subject: 'A sua whitelist mudou de status.',
      html: WhitelistChangeStatus(data.name),
    })
  },
}
