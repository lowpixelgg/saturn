import { prisma } from '@infra/prisma/prisma-client'
import { UserMapper } from '@modules/http/accounts/mappers/UserMapper'
import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository'
import { User } from '@modules/http/accounts/domain/user/user'
import { INotificationsRepository } from '../INotificationsRepository'
import { IConnectionsRepository } from '../IConnectionsRepository'
import { ITokensRepository } from '../ITokensRepository'

const avatars: string[] = [
  'https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/downloads/buddyiconsconavatars/v_igg1_256x256.jpg',
  'https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/downloads/buddyiconsconavatars/v_heists_hockey_mask2_256x256.jpg',
  'https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/downloads/buddyiconsconavatars/v_cunningstunts_dude_256x256.jpg',
  'https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/downloads/buddyiconsconavatars/v_gunrunning_guy_256x256.jpg',
  'https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/downloads/buddyiconsconavatars/v_afterhours_taleofus2_256x256.jpg',
  'https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/downloads/buddyiconsconavatars/v_casino_heist1_256x256.jpg',
  'https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/downloads/buddyiconsconavatars/v_tcph_guard2.jpg',
  'https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/downloads/buddyiconsconavatars/v_tcph_guard1.jpg',
  'https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/downloads/buddyiconsconavatars/v_tcph_keinemusik_me.jpg',
  'https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/downloads/buddyiconsconavatars/v_casino_heist2_256x256.jpg',
  'https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/downloads/buddyiconsconavatars/v_gunrunning_256x256.jpg',
  'https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/downloads/buddyiconsconavatars/v_importexport_importexport_256x256.jpg',
  'https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/downloads/buddyiconsconavatars/v_executives_robe_256x256.jpg',
  'https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/downloads/buddyiconsconavatars/v_heists_balaclava_256x256.jpg',
]

export class PrismaUserRepository implements IUserRepository {
  constructor(
    private notificationsRepository?: INotificationsRepository,
    private connectionsRepository?: IConnectionsRepository,
    private tokensRepository?: ITokensRepository
  ) {}

  async exists(userOrEmail: string): Promise<boolean> {
    const dbQuery = await prisma.user.findFirst({
      where: {
        OR: [{ email: userOrEmail }, { username: userOrEmail }],
      },
    })

    return !!dbQuery
  }

  async findOne(ident: string): Promise<User> {
    const dbQuery = await prisma.user.findFirst({
      where: {
        OR: [
          { email: ident },
          { username: ident },
          { id: ident },
        ],
      },
      include: {
        Profile: true,
        notifications: true,
        Connections: true,
        Staff: true,
        appointment: true,
        Whitelist: {
          select: {
            status: true,
          },
        },
      },
    })

    if (!dbQuery) {
      return null
    }

    return UserMapper.toDomain(dbQuery)
  }

  async save(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user)

    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    })

    if (this.notificationsRepository) {
      this.notificationsRepository.save(user.notifications)
    }

    if (this.connectionsRepository) {
      this.connectionsRepository.save(user.connections)
    }

    if (this.tokensRepository) {
      this.tokensRepository.save(user.tokens)
    }
  }

  async create(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user)

    await prisma.user.create({
      data: {
        ...data,
        Profile: {
          create: {
            nickname: data.username,
            slug: `${Math.floor(Math.random() * (666666 - 9991) + 9991)}`,
            avatar: avatars[Math.floor(Math.random() * avatars.length)],
            banner: 'https://images7.alphacoders.com/564/564932.jpg',
          },
        },
      },
    })

    if (this.notificationsRepository) {
      this.notificationsRepository.create(user.notifications)
    }

    if (this.connectionsRepository) {
      this.connectionsRepository.create(user.connections)
    }

    if (this.tokensRepository) {
      this.tokensRepository.create(user.tokens)
    }
  }
}
