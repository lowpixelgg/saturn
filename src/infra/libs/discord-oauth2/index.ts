import OAUTH2 from 'discord-oauth2';

export const oauth2 = new OAUTH2({
  clientId: process.env.OAUTH2_DISCORD_CLIENT_ID,
  clientSecret: process.env.OAUTH2_DISCORD_CLIENT_SECRET,
  redirectUri: process.env.OAUTH2_DISCORD_REDIRECT_URL,
});
