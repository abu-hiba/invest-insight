import React from 'react'
import { Container, Segment } from 'semantic-ui-react'
import { useMarketRefData } from '../containers/IexContainer'

const MarketSectors = () => {
    const { sectors, loading, error } = useMarketRefData()
    return (
        <Container>
            {loading
                ? 'Loading...'
                : (error
                    ? 'Error loading market sectors'
                    : sectors?.map(sector =>
                        <Segment key={sector.name}>
                            <h4>{sector.name}</h4>
                        </Segment>
                    )
                )
            }
        </Container>
    )
}

export default MarketSectors