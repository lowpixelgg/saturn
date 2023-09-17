export default {
  entry_point_token: process.env.OAUTH2_DISCORD_ENTRY_TOKEN,
  client_id: process.env.OAUTH2_DISCORD_CLIENT_ID,
  client_secret: process.env.OAUTH2_DISCORD_CLIENT_SECRET,
  redirect_uri: 'http://localhost:4096',
  scopes: ['identify', 'guilds.join'],

  // Interview
  interview_channelType: 2,
  parent_category: '1078352775869632532',
  max_interview_channel: 2,
  everyone_role: '1078352676913418330',
  speaker_role: '1081256931290791937',

  accepted: ['1002973868564164628'],
};
