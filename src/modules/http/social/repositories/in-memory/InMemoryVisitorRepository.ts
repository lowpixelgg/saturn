import { Visitor } from '../../domain/profiles/Visitor';
import { Visitors } from '../../domain/profiles/Visitors';

import { FindByProfileParams, IVisitorRepository } from '../IVisitorRepository';

export class InMemoryVisitorRepository implements IVisitorRepository {
  public items: Visitor[] = [];

  constructor() {}

  async findByProfileParams(params: FindByProfileParams): Promise<Visitor> {
    const visitor = this.items.find(
      item => item.visitor_id === params.visitors_id
    );

    return visitor;
  }

  async findAllByProfileParams(
    params: FindByProfileParams
  ): Promise<Visitor[]> {
    const visitor = this.items.filter(
      item => item.visitor_id === params.visitors_id
    );

    return visitor;
  }

  async save(visitors: Visitors): Promise<void> {
    this.items.push(...visitors.getNewItems());

    visitors.getRemovedItems().forEach(visitor => {
      const visitorIndex = this.items.findIndex(visitorItem => {
        return visitorItem.id === visitor.id;
      });

      this.items.splice(visitorIndex, 1);
    });
  }

  async create(visitors: Visitors): Promise<void> {
    this.items.push(...visitors.getItems());
  }
}
