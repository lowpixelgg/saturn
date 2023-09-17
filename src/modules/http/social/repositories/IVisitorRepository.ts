import { Visitor } from '../domain/profiles/Visitor';
import { Visitors } from '../domain/profiles/Visitors';

export type FindByProfileParams = {
  visitor_id?: string;
  visitors_id: string;
};

export interface IVisitorRepository {
  findByProfileParams(params: FindByProfileParams): Promise<Visitor>;
  findAllByProfileParams(params: FindByProfileParams): Promise<Visitor[]>;
  save(visitors: Visitors): Promise<void>;
  create(visitors: Visitors): Promise<void>;
}
