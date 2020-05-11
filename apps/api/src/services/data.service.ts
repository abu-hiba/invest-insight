import iexApi from "../infrastructure/iex/iexApi"

export class DataService {
    public getCompanyProfile = async (symbol: string) => (
        await iexApi(`/stock/${symbol}/company`) // TODO: Add promise type
    ) 
}