import Mail from '@infra/libs/nodemailer/nodemailer';
import { RegistrationEmailTemplate } from '@templates/EmailTemplates/RegistrationMailTemplate';

export default {
  key: 'RegistrationMail',
  options: {
    delay: 5000,
  },

  async handle({ data }) {
    await Mail.sendMail({
      from: 'Rocket Roleplay <noreply@rocketmta.com>',
      to: `${data.name} <${data.email}>`,
      subject: 'Ative seu cadastro na Rocket Roleplay',
      html: RegistrationEmailTemplate(data.name, data.activation_token),
    });
  },
};
