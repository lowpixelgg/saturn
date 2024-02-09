import { resend } from '@infra/libs/resend';
import { RecoveryEmailTemplate } from '@templates/EmailTemplates/RecoveryEmailTemplate';

export default {
  key: 'RecoveryMail',
  options: {
    delay: 5000,
  },

  async handle({ data }) {
    await resend.emails.send({
      from: 'Rocket Roleplay <onboarding@lowpixel.gg>',
      to: data.email,
      subject: 'Recuperação de conta',
      html: RecoveryEmailTemplate(data.name, data.recovery_token),
    });
  },
};
