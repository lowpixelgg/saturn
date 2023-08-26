import { Connection } from '../domain/user/Connection'
import { Connections } from '../domain/user/Connections'

export interface IConnectionsRepository {
  create(connections: Connections): Promise<void>
  save(connections: Connections): Promise<void>
  saveSingle(connection: Connection): Promise<void>
  getByUserAndPlataform(userId: string, plataform: string): Promise<Connection>
}
