import { Webhook } from 'discord-webhook-node';

export const interview = new Webhook(process.env.WEBHOOK_DISCORD_INTERVIEW);
