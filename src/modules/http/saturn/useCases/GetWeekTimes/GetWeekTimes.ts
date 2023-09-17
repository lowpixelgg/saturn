import { TimeMapper } from '../../mappers/TimeMapper';
import { ITimesRepository } from '../../repositories/ITimesRepository';

type GetWeekTimesResponse = {
  weektimes: object[];
  totalCount: number;
};

export class GetWeekTimes {
  constructor(private timesRepository: ITimesRepository) {}

  async execute(): Promise<GetWeekTimesResponse> {
    const today = new Date();

    const result = await this.timesRepository.getWeekTimes(today);

    return {
      weektimes: result.map(time => TimeMapper.toPersistence(time)),
      totalCount: result.length,
    };
  }
}
