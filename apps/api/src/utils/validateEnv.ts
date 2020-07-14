import { cleanEnv, str, port } from 'envalid'

export default function validateEnv() {
    cleanEnv(process.env, {
        PORT: port(),
        MONGO_URL: str(),
        HOST_URL: str(),
        APP_URL: str(),
        SESSION_SECRET: str(),
        REDIS_PORT: port(),
        REDIS_HOST: str(),
        IEX_TOKEN: str(),
        IEX_URL: str(),
        IEX_SSE: str()
    })
}
