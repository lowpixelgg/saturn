import { Webhook } from 'discord-webhook-node';

export const general = new Webhook(process.env.WEBHOOK_DISCORD_DAILY);
export const daily = new Webhook(process.env.WEBHOOK_DISCORD_GENERAL);
export const interview = new Webhook(process.env.WEBHOOK_DISCORD_INTERVIEW);
