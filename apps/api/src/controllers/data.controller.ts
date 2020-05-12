import { Request } from 'express'
import { Controller } from '../interfaces/controller.interface'
import { DataService } from '../services/data.service'
import { Endpoint } from '../routes/router'

export class DataController implements Controller {
    public service: DataService

    constructor() {
        this.service = new DataService
    }

    public endpoints: Endpoint[] = [
        {
            method: 'get',
            route: '/company/:symbol',
            handler: async (req: Request) => (
                await this.service.getCompanyProfile(req.params.symbol)
            )
        }
    ]
}