import dayjs from 'dayjs';
import 'dotenv/config';

export default {
  level: 'v1',
  product: 'Saturn API',
  jwtSecret: process.env.SECRET_KEY,
  expiresIn: dayjs().add(30, 'days').unix(),
  limits: [
    { fileType: 'image/jpeg', maxSizeInBytes: 5242880 }, // 5MB for JPEG files
    { fileType: 'image/png', maxSizeInBytes: 5242880 }, // 5MB for PNG files
    { fileType: 'image/gif', maxSizeInBytes: 15242880 }, // 15MB for GIF files
  ],
};
