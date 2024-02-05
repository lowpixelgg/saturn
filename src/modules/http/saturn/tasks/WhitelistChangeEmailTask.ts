import { resend } from '@infra/libs/resend';
import { WhitelistChangeStatus } from '@templates/EmailTemplates/WhitelistChangeStatus';

export default {
  key: 'WhitelistChangeEmail',
  options: {
    delay: 5000,
  },

  async handle({ data }) {
    await resend.emails.send({
      from: 'Rocket Roleplay <noreply@rocketmta.com>',
      to: data.email,
      subject: 'A sua whitelist mudou de status.',
      html: WhitelistChangeStatus(data.name),
    });
  },
};
