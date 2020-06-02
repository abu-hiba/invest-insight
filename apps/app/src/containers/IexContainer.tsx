import { useState, useEffect } from 'react'
import iiApi from '../services/iiApi'
import { Company, NewsItem, Sector } from '../interfaces'

export interface CompanyState {
    data: Company | null,
    loading: boolean,
    error?: Error
}

export const useCompany = (symbol: string) => {
    const [company, setCompany] = useState<CompanyState>({ data: null, loading: true })

    useEffect(() => {
        iiApi<Company, null>('get', `/company/${symbol}`)
            .then(data => setCompany({ data, loading: false }))
            .catch(error => setCompany({ data: null, error, loading: false }))
    }, [])

    return company
}

export interface SearchState {
    loading: boolean,
    results?: Company[],
    error?: Error
}

export const useSearch = () => {
    const [searchState, setSearchState] = useState<SearchState>({ loading: false })

    const companySearch = (query: string): void => {
        setSearchState({ loading: true })
        iiApi<Company[], null>('get', `/company/search/${query}`)
            .then(results => setSearchState({ results, loading: false }))
            .catch(error => setSearchState({ loading: false, error }))
    }

    return { searchState, companySearch }
}

export interface NewsState {
    loading: boolean,
    items?: NewsItem[],
    error?: Error
}

export const useCompanyNews = (symbol: string, last: number) => {
    const [news, setNews] = useState<NewsState>({ loading: true })

    useEffect(() => {
        iiApi<NewsItem[], null>('get', `/company/news/${symbol}/last/${last}`)
            .then(items => setNews({ items, loading: false }))
            .catch(error => setNews({ loading: false, error }))
    }, [])

    return news
}

export interface RefState {
    loading: boolean,
    sectors?: Sector[],
    error?: Error
}

export const useMarketRefData = (): RefState => {
    const [refData, setRefData] = useState<RefState>({ loading: true })

    useEffect(() => {
        iiApi<Sector[], null>('get', '/sector/all')
            .then(sectors => setRefData({ sectors, loading: false }))
            .catch(error => setRefData({ loading: false, error }))
    }, [])

    return refData
}