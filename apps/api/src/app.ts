import express from 'express'
// import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { Database } from './db'
import loggerMiddleware from './middleware/loggerMiddleware'
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
            origin: true,
            credentials: true, // Allow passing cookies
            optionsSuccessStatus: 200,
            allowedHeaders: ['content-type', 'content-file-name'],
        }

        this.app.use(loggerMiddleware)

        this.app.options('*', cors(corsOptions))
        this.app.use(cors(corsOptions))

        this.app.use(sessionMiddleware)

        this.app.use('/', express.json(), v1.router)

        //Allows requests to be received in json format
        // this.app.use(bodyParser.json({ limit: "50mb" }))

        // //Allows request to be received in x-www-form-urlencoded format
        // this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
            
        // //Enable cors
        // this.app.use(cors({ origin: process.env.APP_URL, credentials: true }))
    }

    // public initialiseRoutes = (routes: Router[]) => {
    //     routes.forEach(route => {
    //         this.app.use('/', )
    //     })
    // }
    
    public listen = () => {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server listening on port ${process.env.PORT}`)
        })
    }
}

export default App
