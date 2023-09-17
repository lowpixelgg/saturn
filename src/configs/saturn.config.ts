import dayjs from 'dayjs';
import 'dotenv/config';

export default {
  level: 'v1',
  product: 'Saturn API',
  jwtSecret: process.env.SECRET_KEY,
  expiresIn: dayjs().add(30, 'days').unix(),
};
