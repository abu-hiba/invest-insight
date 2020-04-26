import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { Database } from './db'
import loggerMiddleware from './loggerMiddleware'
import { Controller } from './interfaces/controller.interface'

class App {
    public app: express.Application
    private db = new Database()

    constructor(controllers: Controller[]) {
        this.app = express()

        this.setConfig()
        this.db.setConfig()
        this.initialiseControllers(controllers)
    }

    private setConfig() {
        dotenv.config()

        this.app.use(loggerMiddleware)

        //Allows requests to be received in json format
        this.app.use(bodyParser.json({ limit: "50mb" }))

        //Allows request to be received in x-www-form-urlencoded format
        this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
            
        //Enable cors
        this.app.use(cors())
    }

private initialiseControllers(controllers: Controller[]) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }
    
    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on port ${process.env.PORT}`)
        })
    }
}

export default App
