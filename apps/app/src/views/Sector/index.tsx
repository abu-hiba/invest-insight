import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Card, Image, Breadcrumb } from 'semantic-ui-react'
import LazyLoad from 'react-lazyload'
import CSS from 'csstype'
import { useSector } from '../../containers/IexContainer'

interface SectorCompanyProps {
    companyName: string,
    symbol: string,
    open: number,
    close: number,
    high: number,
    low: number,
    style: CSS.Properties
}

const SectorCompany: React.FC<SectorCompanyProps> = ({
    companyName,
    symbol,
    style
}) => (
    <Card as={Link} to={`/company/${symbol}`} style={style}>
        <Card.Content>
            <LazyLoad once={true}>
                <Image floated='right' size='mini' src={`${process.env.LOGO_URL}/${symbol}.png`}/>
            </LazyLoad>
            <Card.Header>{symbol}</Card.Header>
            <Card.Description>{companyName}</Card.Description>
        </Card.Content>
    </Card>
)

const SectorPage: React.FC = () => {
    const { name } = useParams()
    const { sectorData: { quotes, loading, error } } = useSector(name!)

    const sections = [
        { key: 'Markets', content: 'Markets', href: '/markets' },
        { key: name, content: name, active: true }
    ]
     
    return (
        <Container style={{ margin: '1em 0' }}>
            {name && <Breadcrumb icon='right angle' sections={sections} />}
            <h2>{name}</h2>
            <Container>
                {!loading ? (
                    error ? error.message : (
                        <Card.Group itemsPerRow={4} stackable>
                            {quotes?.map((quote, i) =>
                                i < 50 && 
                                    <SectorCompany
                                        key={quote.symbol}
                                        {...quote}
                                        style={{ margin: '0.5em' }}
                                    />
                            )}
                        </Card.Group>
                    )
                ) : 'Loading'}
            </Container>
        </Container>
    )
}

export default SectorPage