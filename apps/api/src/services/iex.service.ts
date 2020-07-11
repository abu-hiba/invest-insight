import iexApi from "../infrastructure/iex/iexApi"
import { Company, NewsItem, Sector, Quote, Exchange } from "../interfaces"
import { InternationalSymbol } from "../interfaces/company.interface"

export class IexService {
    async getCompanyProfile(symbol: string) {
        return await iexApi<Company>(`/stock/${symbol}/company`)
    }

    async companyLogo(symbol: string) {
        return await iexApi<{ url: string }>(`/stock/${symbol}/logo`)
    }

    async searchCompanies(query: string) {
        return await iexApi<Company[]>(`/search/${query}`)
    }
    
    async companyNews(symbol: string, last: number) {
        return await iexApi<NewsItem[]>(`/stock/${symbol}/news/last/${last}`)
    }

    async getSectors() { return await iexApi<Sector[]>('/ref-data/sectors') }

    async companiesBySector(sector: string) {
        return await iexApi<Quote[]>(`/stock/market/collection/sector?collectionName=${sector}`)
    }

    async getExchanges() { return await iexApi<Exchange[]>('/ref-data/exchanges') }
    
    async companiesByExchange(exchange: string) {
        return await iexApi<InternationalSymbol[]>(`/ref-data/exchange/${exchange}/symbols`)
    }

    async topList(list: string, limit: number) {
        return await iexApi<Quote[]>(`/stock/market/list/${list}?listLimit=${limit}`)
    }
}