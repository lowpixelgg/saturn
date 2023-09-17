import Mail from '@infra/libs/nodemailer/nodemailer';
import { RecoveryEmailTemplate } from '@templates/EmailTemplates/RecoveryEmailTemplate';

export default {
  key: 'RecoveryMail',
  options: {
    delay: 5000,
  },

  async handle({ data }) {
    await Mail.sendMail({
      from: 'Rocket Roleplay <noreply@rocketmta.com>',
      to: `${data.name} <${data.email}>`,
      subject: 'Recuperação de conta',
      html: RecoveryEmailTemplate(data.name, data.recovery_token),
    });
  },
};
