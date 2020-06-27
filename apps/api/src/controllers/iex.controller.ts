import { Request } from 'express'
import { IexService } from '../services/iex.service'
import { Endpoint } from '../routes/router'
import { Controller, Company, NewsItem, Sector, Quote } from '../interfaces'
import { IexSse } from '../infrastructure/iex/iexApi'

export class IexController implements Controller {
    public service: IexService

    constructor() {
        this.service = new IexService
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
            route: '/company/:symbol/logo',
            handler: async ({ params: { symbol } }): Promise<{ url: string }> =>
                await this.service.companyLogo(symbol)
        },
        {
            method: 'get',
            route: '/company/search/:query',
            handler: async ({ params: { query } }: Request): Promise<Company[]> =>
                await this.service.searchCompanies(query)
        },
        {
            method: 'get',
            route: '/company/:symbol/news/last/:last',
            handler: async ({ params: { symbol, last } }: Request): Promise<NewsItem[]> =>
                await this.service.companyNews(symbol, Number(last))
        },
        {
            method: 'get',
            route: '/sector/all',
            handler: async (): Promise<Sector[]> => await this.service.getSectors()
        },
        {
            method: 'get',
            route: '/sector/:sector',
            handler: async ({ params: { sector } }: Request): Promise<Quote[]> =>
                await this.service.companiesBySector(sector)
        },
        {
            method: 'get',
            route: '/sse/stocks/:symbols',
            handler: (req, res) => {
                const { symbols } = req.params

                res.set({
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                })
                res.flushHeaders()
                res.write('\n\n')

                const sse = new IexSse(process.env.IEX_TOKEN!, res)
                sse.openStream(symbols.split(','))
            }
        }
    ]
}