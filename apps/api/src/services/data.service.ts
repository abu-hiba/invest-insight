import iexApi from "../infrastructure/iex/iexApi"
import { Company, NewsItem } from "../interfaces"

export class DataService {
    public getCompanyProfile = async (symbol: string) => (
        await iexApi<Company>(`/stock/${symbol}/company`)
    ) 

    public searchCompanies = async (query: string) => (
        await iexApi<Company[]>(`/search/${query}`)
    )
    
    public companyNews = async (symbol: string, last: number) => (
        await iexApi<NewsItem[]>(`/stock/${symbol}/news/last/${last}`)
    )
}