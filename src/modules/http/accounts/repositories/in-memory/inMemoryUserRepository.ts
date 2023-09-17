import { User } from '@modules/http/accounts/domain/user/user';
import { IUserRepository } from '@modules/http/accounts/repositories/IUserRepository';
import { IConnectionsRepository } from '../IConnectionsRepository';
import { INotificationsRepository } from '../INotificationsRepository';
import { ITokensRepository } from '../ITokensRepository';

export class InMemoryUserRepository implements IUserRepository {
  public items: User[] = [];

  constructor(
    private notificationsRepository?: INotificationsRepository,
    private connectionsRepository?: IConnectionsRepository,
    private tokensRepository?: ITokensRepository
  ) {}

  async findOne(email: string): Promise<User> {
    let withEmail = this.items.find(user => user.email.value === email);
    let withID = this.items.find(user => user.id === email);
    let withUsername = this.items.find(user => user.username.value === email);

    if (withEmail !== undefined) {
      return withEmail;
    }

    if (withID !== undefined) {
      return withID;
    }

    if (withUsername !== undefined) {
      return withUsername;
    }
  }

  async save(user: User): Promise<void> {
    const index = this.items.findIndex(find => find.id === user.id);
    this.items[index] = user;

    if (this.notificationsRepository) {
      this.notificationsRepository.save(user.notifications);
    }

    if (this.connectionsRepository) {
      this.connectionsRepository.save(user.connections);
    }

    if (this.tokensRepository) {
      this.tokensRepository.save(user.tokens);
    }
  }

  async exists(email: string): Promise<boolean> {
    return this.items.some(user => user.email.value === email);
  }

  async create(dto: User): Promise<void> {
    this.items.push(dto);

    if (this.notificationsRepository) {
      this.notificationsRepository.create(dto.notifications);
    }

    if (this.tokensRepository) {
      this.tokensRepository.create(dto.tokens);
    }
  }

  async findAll(): Promise<User[]> {
    return this.items;
  }
}
