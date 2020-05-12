import { useState, useEffect } from 'react'
import iiApi from '../services/iiApi'
import { Company } from '../interfaces'

export interface UseCompanyData {
    data: Company | null,
    loading: boolean,
    error?: Error
}

export const useCompany = (symbol: string) => {
    const [company, setCompany] = useState<UseCompanyData>({ data: null, loading: true })

    useEffect(() => {
        iiApi<Company, null>('get', `/company/${symbol}`)
            .then(data => setCompany({ data, loading: false }))
            .catch(error => setCompany({ data: null, error, loading: false }))
    }, [])

    return company
}