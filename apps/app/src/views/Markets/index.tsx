import React, { useEffect } from 'react'
import Category from './MarketCategory'
import { useMarketCategories } from '../../containers/IexContainer'

const Markets = () => {
    const { sectors, exchanges, getSectors, getExchanges } = useMarketCategories()

    useEffect(() => {
        getSectors()
        getExchanges()
    }, [])

    return (
        <>
            <Category category={sectors} header='Sectors' />
            <Category category={exchanges} header='Exchanges' />
        </>
    )
}

export default Markets
