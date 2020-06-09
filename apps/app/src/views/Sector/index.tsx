import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Segment } from 'semantic-ui-react'
import { useSector } from '../../containers/IexContainer'

const SectorPage: React.FC = () => {
    const { name } = useParams()
    const { quotes, loading, error } = useSector(name!)    
    return (
        <Container>
            <h2>{name}</h2>
            <Container>
                {!loading ? (
                    error ? error.message
                        : (quotes?.map(({ symbol, companyName, open, close, high, low }) => (
                            <Link key={symbol} to={`/company/${symbol}`} style={{ color: '#000' }}>
                                <Segment style={{ margin: '5px 0' }}>
                                    <h4>{symbol}</h4>
                                    <h5>{companyName}</h5>
                                    <p>open: {open} close: {close}</p>
                                    <p>low: {low} high: {high}</p>
                                </Segment>
                            </Link>
                        )))
                ) : 'Loading'}
            </Container>
        </Container>
    )
}

export default SectorPage