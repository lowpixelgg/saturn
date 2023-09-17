import Queue from 'bull';
import redisConfig from '@configs/redis.config';
import * as jobs from './index';
import log from '@vendor/log';

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle,
  options: job.options,
}));

export default {
  queues,
  add(name: string, data: any) {
    const queue = this.queues.find(queue => queue.name === name);

    return queue.bull.add(data, queue.options);
  },
  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle);

      log.debug(`Bull: ${queue.name} has been processed`);

      queue.bull.on('failed', (job: string, err: Error) => {
        console.log(log.error(`Bull: ${queue.key}, ${err}`));
      });
    });
  },
};
