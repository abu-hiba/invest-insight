import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Segment } from 'semantic-ui-react'
import { useMarketRefData } from '../containers/IexContainer'

const marketSectorsContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    justifyContent: 'space-between'
}

const MarketSectors = () => {
    const { sectors, loading, error } = useMarketRefData()
    return (
        <Container fluid style={{ marginTop: '1em' }}>
            <h2>Market Sectors</h2>
            <Container style={marketSectorsContainer}>
                {loading
                    ? 'Loading...'
                    : (error
                        ? 'Error loading market sectors'
                        : sectors?.map(sector =>
                            <Segment key={sector.name} style={{ margin: '0.3em' }}>
                                <Link to={`/sector/${sector.name}`}>
                                    <h4 style={{ color: '#545454' }}>
                                        {sector.name}
                                    </h4>
                                </Link>
                            </Segment>
                        )
                    )
                }
            </Container>
        </Container>
    )
}

export default MarketSectors