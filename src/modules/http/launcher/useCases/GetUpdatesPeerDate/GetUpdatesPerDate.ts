import { IUpdatesRepository } from '../../repositories/IUpdatesRepository';
import { Update } from '../../domain/Update';
import isISODate from 'is-iso-date';

type GetUpdatesPerDateRequest = {
  date: string;
};

type GetUpdatesPerDateResponse = {
  data: Update[];
};

export class GetUpdatesPerDate {
  constructor(private updatesRepository: IUpdatesRepository) {}

  async execute({
    date,
  }: GetUpdatesPerDateRequest): Promise<GetUpdatesPerDateResponse> {
    if (isISODate(date)) {
      const parsedDate = new Date(date);
      const updates = await this.updatesRepository.getUpdatesByDate(parsedDate);

      return { data: updates };
    }

    return { data: [] };
  }
}
