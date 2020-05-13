import iexApi from "../infrastructure/iex/iexApi"

export class DataService {
    public getCompanyProfile = async (symbol: string) => (
        await iexApi(`/stock/${symbol}/company`) // TODO: Add promise type
    ) 

    public searchCompanies = async (query: string) => (
        await iexApi(`/search/${query}`)
    )
}