import { GetTokenByCodeType } from '../@types/OAuth2Types'
import constants from '@configs/constants/discord'
import axios from 'axios'
import { oauth2 } from '@infra/libs/discord-oauth2'

export default class OAUTH2 {
  static async getTokenByCode(code: string): Promise<GetTokenByCodeType> {
    const oauth = await oauth2.tokenRequest({
      grantType: 'authorization_code',
      scope: ['identify', 'guilds.join'],

      code: code,
    })

    if (!oauth.access_token) {
      return null
    }

    return oauth
  }

  static async getTokenByRefresh(
    refresh_token: string
  ): Promise<GetTokenByCodeType> {
    const collection = new URLSearchParams({
      client_id: process.env.OAUTH2_DISCORD_CLIENT_ID,
      client_secret: process.env.OAUTH2_DISCORD_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    })

    const { data } = await axios.post(constants.entry_point_token, collection)

    if (!data) {
      return null
    }

    return data
  }

  static async me(access_token: string) {
    const user = await oauth2.getUser(access_token)

    if (!user.id) {
      return null
    }

    return user
  }
}
