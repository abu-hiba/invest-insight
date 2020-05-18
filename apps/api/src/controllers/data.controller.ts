import { Request } from 'express'
import { DataService } from '../services/data.service'
import { Endpoint } from '../routes/router'
import { Controller, Company, NewsItem } from '../interfaces'

export class DataController implements Controller {
    public service: DataService

    constructor() {
        this.service = new DataService
    }

    public endpoints: Endpoint[] = [
        {
            method: 'get',
            route: '/company/:symbol',
            handler: async ({ params: { symbol } }: Request): Promise<Company> =>
                await this.service.getCompanyProfile(symbol)
        },
        {
            method: 'get',
            route: '/company/search/:query',
            handler: async ({ params: { query } }: Request): Promise<Company[]> =>
                await this.service.searchCompanies(query)
        },
        {
            method: 'get',
            route: '/company/news/:symbol/last/:last',
            handler: async ({ params: { symbol, last } }: Request): Promise<NewsItem[]> =>
                await this.service.companyNews(symbol, Number(last))
        }
    ]
}