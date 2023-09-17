import { beforeEach, describe, it, expect } from 'vitest';
import { Staff } from '../../domain/Staff';
import { Time } from '../../domain/Time';
import { Times } from '../../domain/Times';
import { InMemoryStaffRepository } from '../../repositories/in-memory/InMemoryStaffRepository';
import { InMemoryTimesRepository } from '../../repositories/in-memory/InMemoryTimesRepository';
import { IStaffReposiotry } from '../../repositories/IStaffRepository';
import { ITimesRepository } from '../../repositories/ITimesRepository';
import { CreateWeekTimes } from '../CreateWeekTimes/CreateWeekTimes';
import { GetWeekTimes } from './GetWeekTimes';

let staffRepository: IStaffReposiotry;
let timesRepository: ITimesRepository;
let getWeekTimes: GetWeekTimes;

describe('Get Week Times', () => {
  beforeEach(async () => {
    staffRepository = new InMemoryStaffRepository();
    timesRepository = new InMemoryTimesRepository();
    getWeekTimes = new GetWeekTimes(timesRepository);

    const staff = Staff.create({
      access_level: 'all',
      user_id: '12345',
      updated_at: new Date().toISOString(),
    });

    await staffRepository.create(staff);

    for (let i = 0; i < 1; i++) {
      const times = Times.create([
        Time.create({
          date: new Date().toISOString(),
          staff_id: '12345',
        }),
      ]);

      await timesRepository.create(times);
    }
  });

  it('should be able to get week times based on real date', async () => {
    const result = await getWeekTimes.execute();

    expect(result.totalCount).toEqual(1);
    expect(result.weektimes).toBeTypeOf('object');
  });
});
