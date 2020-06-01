import React from 'react'
import { useMarketRefData } from '../containers/IexContainer'

const MarketSectors = () => {
    const { sectors, loading, error } = useMarketRefData()
    return (
        <>
            {loading
                ? 'Loading...'
                : sectors?.map(sector => 
                    <p key={sector.name}>{sector.name}</p>
                )
            }
        </>
    )
}

export default MarketSectors