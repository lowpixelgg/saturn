import { Connection } from '../../domain/user/Connection'
import { Connections } from '../../domain/user/Connections'
import { IConnectionsRepository } from '../IConnectionsRepository'

export class InMemoryConnectionRepository implements IConnectionsRepository {
  private items: Connection[] = []

  async create(connections: Connections): Promise<void> {
    this.items.push(...connections.getItems())
  }

  async save(connections: Connections): Promise<void> {
    this.items.push(...connections.getNewItems())

    connections.getRemovedItems().forEach(connection => {
      const connectionsIndex = this.items.findIndex(connectionsItem => {
        return connectionsItem.id === connection.id
      })

      this.items.splice(connectionsIndex, 1)
    })
  }

  async getByUserAndPlataform(
    userId: string,
    plataform: string
  ): Promise<Connection> {
    const index = this.items.findIndex(
      connection =>
        connection.id === userId && connection.plataform === plataform
    )
    return this.items[index]
  }

  async saveSingle(connection: Connection): Promise<void> {
    const index = this.items.findIndex(conn => conn.id === connection.id)
    this.items[index] = connection
  }
}
