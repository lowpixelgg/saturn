import { Resend } from 'resend';
export const resend = new Resend(process.env.MAILER_API_KEY);
