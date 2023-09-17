export default {
  host: process.env.MAILER_HOST,
  port: 587,
  auth: {
    user: process.env.MAILER_AUTH_USERNAME,
    pass: process.env.MAILER_AUTH_PASSWORD,
  },
} as Object;
