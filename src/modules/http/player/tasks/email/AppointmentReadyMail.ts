import Mail from '@infra/libs/nodemailer/nodemailer';
import { AppointmentReadyTemplate } from '@templates/AppointmentTemplates/AppointmentReadyTemplate';

export default {
  key: 'AppointmentReadyMail',
  options: {
    delay: 5000,
  },

  async handle({ data }) {
    await Mail.sendMail({
      from: 'Rocket Roleplay <noreply@rocketmta.com>',
      to: `${data.username} <${data.email}>`,
      subject: 'Esta na hora! Entre na chamada da sua entrevista.',
      html: AppointmentReadyTemplate(data.username, data.channelId),
    });
  },
};
