import connectRedis from 'connect-redis'
import session from 'express-session'
import redis from 'redis'

const {
  SESSION_SECRET,
  REDIS_PORT,
} = process.env

const redisClient = redis.createClient(Number(REDIS_PORT), 'redis')

redisClient.on('error', (err: Error) => {
  console.error('Redis error: ', err)
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