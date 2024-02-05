import { resend } from '@infra/libs/resend';
import { AppointmentReadyTemplate } from '@templates/AppointmentTemplates/AppointmentReadyTemplate';

export default {
  key: 'AppointmentReadyMail',
  options: {
    delay: 5000,
  },

  async handle({ data }) {
    await resend.emails.send({
      from: 'Rocket Roleplay <noreply@rocketmta.com>',
      to: data.email,
      subject: 'Esta na hora! Entre na chamada da sua entrevista.',
      html: AppointmentReadyTemplate(data.username, data.channelId),
    });
  },
};
