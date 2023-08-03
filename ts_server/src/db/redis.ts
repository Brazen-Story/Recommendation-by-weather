// db/redis.ts
import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

export const redis = new Redis({
  host: '127.0.0.1',  // Redis 서버의 IP 주소
  port: Number(process.env.REDIS_PORT),  // Redis 서버의 포트 번호
  password: process.env.REDIS_PW,  // 필요한 경우 Redis 서버의 비밀번호
});
