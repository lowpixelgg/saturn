import { Profile, Visitor as PersistenceVisitor } from '@prisma/client';

import { Visitor } from '../domain/profiles/Visitor';

type PersistenceVisitorRaw = PersistenceVisitor & {
  visitor: Profile;
  at: Date;
};

export class VisitorMapper {
  static toDomain(raw: PersistenceVisitorRaw): Visitor {
    const subscription = Visitor.create(
      {
        visitors_id: raw.visitors_id,
        visitor_id: raw.visitor_id,
        visitor: raw.visitor,
        at: raw.at,
      },
      raw.id
    );

    return subscription;
  }

  static toPersistence(visitor: Visitor) {
    return {
      id: visitor.id,
      visitors_id: visitor.visitors_id,
      visitor_id: visitor.visitor_id,
      visitor: visitor.visitor,
      at: visitor.at,
    };
  }
}
