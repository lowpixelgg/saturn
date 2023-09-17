import { Visitor } from '@modules/http/social/domain/profiles/Visitor';
import { IProfilesRepository } from '@modules/http/social/repositories/IProfilesRepository';
import { IVisitorRepository } from '@modules/http/social/repositories/IVisitorRepository';
import { Either, left, right } from '@core/logic/Either';
import { GetProfileDoesNotExist } from './errors/GetProfileDoesNotExist';

type GetProfileVisitorsRequest = {
  visitors_id: string;
};

type GetProfileVisitorsResponse = Either<GetProfileDoesNotExist, Visitor[]>;

export class GetProfileVisitors {
  constructor(
    private visitorsRepository: IVisitorRepository,
    private profilesRepository: IProfilesRepository
  ) {}

  async execute({
    visitors_id,
  }: GetProfileVisitorsRequest): Promise<GetProfileVisitorsResponse> {
    const exists = await this.profilesRepository.exists(visitors_id);

    if (!exists) {
      return left(new GetProfileDoesNotExist());
    }

    const visitors = await this.visitorsRepository.findAllByProfileParams({
      visitors_id,
    });

    return right(visitors);
  }
}
