import { useState, useEffect } from 'react'
import iiApi from '../services/iiApi'
import { Company, NewsItem, Sector, Quote, InternationalSymbol, Exchange } from '../interfaces'
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

export interface ListState<T> extends HookState { items?: T[] }

export const useSector = (sectorName: string): { sectorData: ListState<Quote>, companiesBySector: Function } => {
    const [sectorData, setSectorData] = useState<ListState<Quote>>({ loading: true })

    const db = useIDB()

    useEffect(() => {
        db ? db.find<Quote[]>({ store: 'sectors', key: sectorName })
            .then(items => setSectorData({ items, loading: false }))
            .catch(() => companiesBySector(sectorName))
        : companiesBySector(sectorName)
    }, [])

    const companiesBySector = (sectorName: string): void => {
        iiApi<Quote[]>('get', `/sector/${sectorName}`)
            .then(items => {
                setSectorData({ items, loading: false })
                db?.save({ store: 'sectors', key: sectorName, data: items })
            })
            .catch(error => setSectorData({ loading: false, error }))
    }

    return { sectorData, companiesBySector }
}

export const useExchange = (exchangeName: string): {
    exchangeData: ListState<InternationalSymbol>,
    companiesByExchange: Function
} => {
    const [exchangeData, setExchangeData] = useState<ListState<InternationalSymbol>>({ loading: true })

    const db = useIDB()

    useEffect(() => {
        db ? db.find<InternationalSymbol[]>({ store: 'exchanges', key: exchangeName })
            .then(items => setExchangeData({ items, loading: false }))
            .catch(() => companiesByExchange(exchangeName))
        : companiesByExchange(exchangeName)
    }, [])

    const companiesByExchange = (exchangeName: string): void => {
        iiApi<InternationalSymbol[]>('get', `/exchange/${exchangeName}`)
            .then(items => {
                setExchangeData({ items, loading: false })
                db?.save({ store: 'exchanges', key: exchangeName, data: items })
            })
            .catch(error => setExchangeData({ loading: false, error }))
    }

    return { exchangeData, companiesByExchange }
}

export interface MarketCategory<T> extends HookState { data?: T }

export const useMarketCategories = () => {
    const [sectors, setSectors] = useState<MarketCategory<Sector[]>>()
    const [exchanges, setExchanges] = useState<MarketCategory<Exchange[]>>()

    const db = useIDB()

    const fetchSectors = () =>
        iiApi<Sector[]>('get', '/sector/all')
            .then(data => {
                setSectors({ data, loading: false })
                db?.save({ store: 'markets', key: 'sectors', data })
            })
            .catch(error => setSectors({ error, loading: false }))

    const getSectors = () =>
        db ? db.find<Sector[]>({ store: 'markets', key: 'sectors' })
            .then(data => setSectors({ data, loading: false }))
            .catch(() => fetchSectors())
        : fetchSectors()

    const fetchExchanges = () =>
        iiApi<Exchange[]>('get', '/exchange/all')
            .then(data => {
                setExchanges({ data, loading: false })
                db?.save({ store: 'markets', key: 'exchanges', data })
            })
            .catch(error => setExchanges({ error, loading: false }))

    const getExchanges = () =>
        db ? db.find<Exchange[]>({ store: 'markets', key: 'exchanges' })
            .then(data => setExchanges({ data, loading: false }))
            .catch(() => fetchExchanges())
        : fetchExchanges()

    return { sectors, getSectors, exchanges, getExchanges }
}

export const useList = (listType: 'gainers' | 'losers', limit?: number) => {
    const [list, setList] = useState<ListState<Quote>>()

    useEffect(() => {
        iiApi<Quote[]>('get', `/stocks/list/${listType}/${limit || ''}`)
            .then(items => setList({ items, loading: false }))
            .catch(error => setList({ loading: false, error }))
    }, [])

    return list
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

    const closeStream = () => sse && sse.close()

    return { openStream, closeStream, event }
}