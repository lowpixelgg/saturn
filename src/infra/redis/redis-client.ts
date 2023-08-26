import RedisClient from "ioredis";
import { promisify } from "util";

const redis = new RedisClient();

function get(value: string) {
  const syncRedisGet = promisify(redis.get).bind(redis);
  return syncRedisGet(value);
}

function set(key: string, value: string) {
  const syncRedisSet = promisify(redis.set).bind(redis);
  return syncRedisSet(key, value);
}

export { redis, get, set };
