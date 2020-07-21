import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Database } from './db'
import loggerMiddleware, { logger } from './middleware/loggerMiddleware'
import sessionMiddleware from './middleware/sessionMiddleware'
import v1 from './routes/v1'

class App {
    public app: express.Application
    public db = new Database()

    constructor() {
        this.app = express()

        this.setConfig()
        this.db.setConfig()
    }

    public setConfig = () => {
        dotenv.config()

        const corsOptions = {
            maxAge: 1800,
            origin: process.env.APP_URL,
            credentials: true, // Allow passing cookies
            optionsSuccessStatus: 200,
            allowedHeaders: ['content-type', 'content-file-name'],
        }

        this.app.use(cors(corsOptions))
        this.app.options('*', cors())

        this.app.use(loggerMiddleware)

        this.app.use(sessionMiddleware)

        this.app.use('/', express.json(), v1.router)
    }

    public listen = () => {
        this.app.listen(process.env.PORT, () => {
            logger.info(`Server listening on port ${process.env.PORT}`)
        })
    }
}

export default App
