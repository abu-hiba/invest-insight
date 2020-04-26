import { cleanEnv, str, port } from 'envalid'

export default function validateEnv() {
    cleanEnv(process.env, {
        PORT: port(),
        MONGO_URL: str()
    })
}
