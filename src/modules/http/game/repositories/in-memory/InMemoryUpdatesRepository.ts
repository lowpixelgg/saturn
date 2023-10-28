import { IUpdatesRepository } from '../IUpdatesRepository';
import { Update } from '../../domain/Update';
import { UpdateMapper } from '../../mappers/UpdateMapper';

export class InMemoryUpdatesRepository implements IUpdatesRepository {
  private items: Update[] = [];

  async create(update: Update): Promise<void> {
    this.items.push(update);
  }

  async getUpdatesByDate(date: Date): Promise<Update[]> {
    return this.items.filter(
      update => new Date(update.release) > new Date(date)
    );
  }
}
