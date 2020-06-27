import { useState, useEffect } from 'react'
import iiApi from '../services/iiApi'
import { Company, NewsItem, Sector, Quote } from '../interfaces'
import { useIDB } from './IDBContext'

interface HookState { loading: boolean, error?: Error }

export interface CompanyState extends HookState { data?: Company }

export const useCompany = (symbol: string) => {
    const [company, setCompany] = useState<CompanyState>({ loading: true })

    const fetchCompany = (symbol: string) =>
        iiApi<Company>('get', `/company/${symbol}`)
            .then((data) => setCompany({ data, loading: false }))
            .catch(error => setCompany({ error, loading: false }))

    useEffect(() => {
        fetchCompany(symbol)
    }, [])

    return { company, fetchCompany }
}

export const useCompanyLogo = (symbol: string) => {
    const [logo, setLogo] = useState<{ url: string }>()

    useEffect(() => {
        iiApi<{ url: string }, null>('get', `/company/${symbol}/logo`)
            .then(setLogo)
    }, [])

    return logo
}

interface SearchState extends HookState { results?: Company[] }

export const useSearch = () => {
    const [searchState, setSearchState] = useState<SearchState>({ loading: false })

    const companySearch = (query: string): void => {
        setSearchState({ loading: true })
        iiApi<Company[]>('get', `/company/search/${query}`)
            .then(results => setSearchState({ results, loading: false }))
            .catch(error => setSearchState({ loading: false, error }))
    }

    return { searchState, companySearch }
}

export interface NewsState extends HookState { items?: NewsItem[] }

export const useCompanyNews = (symbol: string, last: number) => {
    const [news, setNews] = useState<NewsState>({ loading: true })

    const fetchNews = (symbol: string, last: number) =>
        iiApi<NewsItem[]>('get', `/company/${symbol}/news/last/${last}`)
            .then(items => setNews({ items, loading: false }))
            .catch(error => setNews({ loading: false, error }))

    useEffect(() => {
        fetchNews(symbol, last)
    }, [])

    return { news, fetchNews }
}

interface RefState extends HookState { sectors?: Sector[] }

export const useMarketRefData = (): RefState => {
    const [refData, setRefData] = useState<RefState>({ loading: true })

    const db = useIDB()

    useEffect(() => {
        db?.find({ store: 'markets', key: 'sectors' })
            .then(sectors => {
                setRefData({ sectors: sectors as Sector[], loading: false })
            })
            .catch(() => {
                fetchMarketSectors()
            })
    }, [])

    const fetchMarketSectors = () => {
        iiApi<Sector[]>('get', '/sector/all')
            .then(sectors => {
                setRefData({ sectors, loading: false })
                
                db?.save({ store: 'markets', key: 'sectors', data: sectors })
            })
            .catch(error => setRefData({ loading: false, error }))
    }

    return refData
}

interface SectorState extends HookState { quotes?: Quote[] }

export const useSector = (sectorName: string): { sectorData: SectorState, companiesBySector: Function } => {
    const [sectorData, setSectorData] = useState<SectorState>({ loading: true })

    const db = useIDB()

    useEffect(() => {
        db?.find({ store: 'sectors', key: sectorName })
            .then(quotes => {
                setSectorData({ quotes: quotes as Quote[], loading: false })
            })
            .catch(() => {
                companiesBySector(sectorName)
            })
    }, [])

    const companiesBySector = (sectorName: string): void => {
        iiApi<Quote[]>('get', `/sector/${sectorName}`)
            .then(quotes => {
                setSectorData({ quotes, loading: false })

                db?.save({ store: 'sectors', key: sectorName, data: quotes })
            })
            .catch(error => setSectorData({ loading: false, error }))
    }

    return { sectorData, companiesBySector }
}

export const useEventStream = () => {
    const [event, setEvent] = useState<Quote>()

    let sse: EventSource

    const openStream = (symbols: string[]) => {
        sse = new EventSource(`${process.env.API_URL}/sse/stocks/${symbols.join()}`)
        sse.onmessage = e => {
            const result = JSON.parse(e.data)[0]
            result && setEvent(result)
        }
    }

    const closeStream = () => sse.close()

    return { openStream, closeStream, event }
}