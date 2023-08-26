import { Connection as PersistenceConnection } from '@prisma/client'
import { Connection } from '@modules/http/accounts/domain/user/Connection'

export class ConnectionMapper {
  static toDomain(raw: PersistenceConnection) {
    const connection = Connection.create(
      {
        plataform: raw.plataform,
        fallback: raw.fallback,
        user_id: raw.user_id,
      },
      raw.id
    )

    return connection
  }

  static toPersistence(raw: Connection) {
    return {
      id: raw.id,
      fallback: raw.fallback,
      plataform: raw.plataform,
      user_id: raw.user_id,
    }
  }
}
