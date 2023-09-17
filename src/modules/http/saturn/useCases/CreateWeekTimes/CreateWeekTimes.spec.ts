import { describe, it, expect, beforeEach } from 'vitest';
import { Staff } from '../../domain/Staff';
import { InMemoryStaffRepository } from '../../repositories/in-memory/InMemoryStaffRepository';
import { InMemoryTimesRepository } from '../../repositories/in-memory/InMemoryTimesRepository';
import { IStaffReposiotry } from '../../repositories/IStaffRepository';
import { ITimesRepository } from '../../repositories/ITimesRepository';
import { CreateWeekTimes } from './CreateWeekTimes';

let staffRepository: IStaffReposiotry;
let timesRepository: ITimesRepository;
let createWeekTimes: CreateWeekTimes;

describe('Create Week Times', () => {
  beforeEach(async () => {
    timesRepository = new InMemoryTimesRepository();
    staffRepository = new InMemoryStaffRepository(timesRepository);
    createWeekTimes = new CreateWeekTimes(staffRepository);

    const staff = Staff.create({
      access_level: 'all',
      user_id: '12345',
      updated_at: new Date().toISOString(),
    });

    await staffRepository.create(staff);
  });

  it('should be able to create a week time', async () => {
    const times: any[] = [{ date: new Date().toISOString() }];
    const result = await createWeekTimes.execute({ id: '12345', times });

    expect(result.isRight()).toBeTruthy();
  });

  it('not should be able to create a week time with invalid-staff:id', async () => {
    const times: any[] = [{ date: new Date().toISOString() }];
    const result = await createWeekTimes.execute({
      id: '777666',
      times: times,
    });

    expect(result.isLeft()).toBeTruthy();
  });

  it('not should be able to create a week time with invalid times array length', async () => {
    const result = await createWeekTimes.execute({
      id: '123456',
      times: [],
    });

    expect(result.isLeft()).toBeTruthy();
  });
});
