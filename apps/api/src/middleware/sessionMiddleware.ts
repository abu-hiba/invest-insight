import connectRedis from 'connect-redis'
import session from 'express-session'
import redis from 'redis'
import { logger } from './loggerMiddleware'

const {
  SESSION_SECRET,
  REDIS_PORT
} = process.env

const redisClient = redis.createClient({
  host: 'redis',
  port: Number(REDIS_PORT)
})

redisClient.on('error', (err: Error) => {
  logger.error(err)
})

const RedisStore = connectRedis(session)

export default session({
    secret: `${SESSION_SECRET}`,
    name: 'inv-ins.sid',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new RedisStore({ client: redisClient }),
})