import { Time } from '../domain/Time';
import { Times } from '../domain/Times';

export interface ITimesRepository {
  save(times: Times): Promise<void>;
  create(times: Times): Promise<void>;
  saveSingle(time: Time): Promise<void>;
  getWeekTimeById(timeId: string): Promise<Time>;
  getWeekTimes(gt: any): Promise<Time[]>;
}
