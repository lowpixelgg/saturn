import { InMemoryProfilesRepository } from '@modules/http/social/repositories/in-memory/InMemoryProfilesRepository';
import { InMemoryVisitorRepository } from '@modules/http/social/repositories/in-memory/InMemoryVisitorRepository';
import { IProfilesRepository } from '@modules/http/social/repositories/IProfilesRepository';
import { IVisitorRepository } from '@modules/http/social/repositories/IVisitorRepository';
import { expect, describe, it, beforeEach } from 'vitest';

import { SubscribeVisitor } from './SubscribeVisitor';

let visitorsRepository: IVisitorRepository;
let profilesRespository: IProfilesRepository;
let subscribeVisitor: SubscribeVisitor;

describe('UpdateProfile', () => {
  beforeEach(() => {
    visitorsRepository = new InMemoryVisitorRepository();
    profilesRespository = new InMemoryProfilesRepository(visitorsRepository);
    subscribeVisitor = new SubscribeVisitor(
      profilesRespository,
      visitorsRepository
    );
  });

  it('should be able to assign visitor to profile', async () => {
    const visitor = await subscribeVisitor.execute({
      visitors_id: '12345',
      visitor_id: '123456',
    });

    expect(visitor.isRight()).toBeTruthy();
  });

  it('not should be able to assign visitor to profile', async () => {
    const visitor = await subscribeVisitor.execute({
      visitors_id: '77777',
      visitor_id: '1234561',
    });

    expect(visitor.isLeft()).toBeTruthy();
  });
});
