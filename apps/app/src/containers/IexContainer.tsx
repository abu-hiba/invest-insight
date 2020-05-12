import { useState, useEffect } from 'react'
import iiApi from '../services/iiApi'
import { Company } from '../interfaces'

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
    results: Company[] | null,
    error?: Error
}

export const useSearch = () => {
    const [searchState, setSearchState] = useState<SearchState>({ results: null, loading: true })

    const companySearch = (query: string): void => {
        iiApi<Company[], null>('get', `/company/search/${query}`)
            .then(results => setSearchState({ results, loading: false }))
            .catch(error => setSearchState({ results: null, loading: false, error }))
    }

    return { searchState, companySearch }
}