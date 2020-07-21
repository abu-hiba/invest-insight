import React, { useEffect } from 'react'
import Category from './MarketCategory'
import { useMarketCategories } from '../../containers/IexContainer'

const Markets = () => {
    const { sectors, exchanges, getSectors, getExchanges } = useMarketCategories()

    useEffect(() => {
       (async function () { 
            await getSectors()
            await getExchanges()
        }())
    }, [])

    return (
        <>
            <Category category={sectors} categorySlug='sector' header='Sectors' />
            <Category category={exchanges} categorySlug='exchange' header='Exchanges' />
        </>
    )
}

export default Markets
