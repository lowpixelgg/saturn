import { resend } from '@infra/libs/resend';
import { RegistrationEmailTemplate } from '@templates/EmailTemplates/RegistrationMailTemplate';

export default {
  key: 'RegistrationMail',
  options: {
    delay: 5000,
  },

  async handle({ data }) {
    await resend.emails.send({
      from: 'Rocket Roleplay <onboarding@resend.dev>',
      to: data.email,
      subject: 'Ative seu cadastro na Rocket Roleplay',
      html: RegistrationEmailTemplate(data.name, data.activation_token),
    });
  },
};
