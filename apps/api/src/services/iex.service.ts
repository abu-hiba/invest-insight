import iexApi from "../infrastructure/iex/iexApi"
import { Company, NewsItem, Sector } from "../interfaces"

export class IexService {
    public getCompanyProfile = async (symbol: string) =>
        await iexApi<Company>(`/stock/${symbol}/company`)

    public searchCompanies = async (query: string) =>
        await iexApi<Company[]>(`/search/${query}`)
    
    public companyNews = async (symbol: string, last: number) =>
        await iexApi<NewsItem[]>(`/stock/${symbol}/news/last/${last}`)

    public getSectors = async () => await iexApi<Sector[]>('/ref-data/sectors')

    public companiesBySector = async (sector: string) =>
        await iexApi(`/stock/market/collection/sector?collectionName=${sector}`) 
}