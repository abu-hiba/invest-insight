import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Segment, Responsive } from 'semantic-ui-react'
import CSS from 'csstype'
import { useMarketRefData } from '../containers/IexContainer'

interface SectorSegmentProps {
    name: string,
    style?: CSS.Properties
}

const marketSectorsContainer: CSS.Properties = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    justifyContent: 'space-between'
}

const SectorSegment: React.FC<SectorSegmentProps> = ({ name, style }) => {
    const [hovered, setHovered] = useState(false)
    return (
        <Segment
            raised={hovered}
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
            style={style}
        >
            <Link to={`/sector/${name}`}>
                <h4 style={{ color: `${hovered ? '#000' : '#545454'}` }}>
                    {name}
                </h4>
            </Link>
        </Segment>
    )
}

const MarketSectors: React.FC = () => {
    const { sectors, loading, error } = useMarketRefData()
    return (
        <Container fluid style={{ marginTop: '1em' }}>
            <h2>Market Sectors</h2>
            <Container style={marketSectorsContainer}>
                {loading
                    ? 'Loading...'
                    : (error
                        ? 'Error loading market sectors'
                        : sectors?.map(({ name }) =>
                            <>
                                <Responsive
                                    as={SectorSegment}
                                    key={name}
                                    name={name}
                                    style={{ margin: '0.3em', flexGrow: 1, textAlign: 'center' }}
                                    minWidth={500}
                                />
                                <Responsive
                                    as={SectorSegment}
                                    key={name}
                                    name={name}
                                    style={{ margin: '0.3em', width: '100%' }}
                                    maxWidth={500}
                                />
                            </>
                        )
                    )
                }
            </Container>
        </Container>
    )
}

export default MarketSectors