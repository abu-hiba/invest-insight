import React, { useEffect } from 'react'
import Category from './MarketCategory'
import { useMarketCategories } from '../../containers/IexContainer'

const Markets = () => {
    const { sectors, exchanges, fetchSectors, fetchExchanges } = useMarketCategories()

    useEffect(() => {
        fetchSectors()
        fetchExchanges()
    }, [])

    return (
        <>
            <Category category={sectors} header='Sectors' />
            <Category category={exchanges} header='Exchanges' />
        </>
    )
}

export default Markets
