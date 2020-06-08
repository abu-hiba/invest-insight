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
            {!loading ? (
                quotes?.map(({ symbol, companyName, open, close, high, low }) => (
                    <Link to={`/company/${symbol}`}>
                        <Segment key={symbol}>
                            <h4>{symbol}</h4>
                            <h5>{companyName}</h5>
                            <p>open: {open} close: {close}</p>
                            <p>low: {low} high: {high}</p>
                        </Segment>
                    </Link>
                ))
            ) : 'Loading'}
        </Container>
    )
}

export default SectorPage