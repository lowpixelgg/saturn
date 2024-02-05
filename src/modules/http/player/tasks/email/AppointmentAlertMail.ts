import { resend } from '@infra/libs/resend';
import { AppointmentAlertTemplate } from '@templates/AppointmentTemplates/AppointmentAlertTemplate';

export default {
  key: 'AppointmentAlertMail',
  options: {
    delay: 5000,
  },

  async handle({ data }) {
    await resend.emails.send({
      from: 'Rocket Roleplay <noreply@rocketmta.com>',
      to: data.email,
      subject: 'A sua entrevista começa em 10 minutos.',
      html: AppointmentAlertTemplate(data.message),
    });
  },
};
