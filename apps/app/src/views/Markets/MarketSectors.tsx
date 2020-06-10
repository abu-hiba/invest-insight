import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Segment, Responsive, Header } from 'semantic-ui-react'
import CSS from 'csstype'
import { useMarketRefData } from '../../containers/IexContainer'

interface SectorSegmentProps {
    name: string,
    style?: CSS.Properties
}

const marketSectorsContainer: CSS.Properties = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
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
        <Container fluid style={{ margin: '1em 0' }}>
            <Header as='h2' dividing>Market Sectors</Header>
            <div style={marketSectorsContainer}>
                {loading
                    ? 'Loading...'
                    : (error
                        ? 'Error loading market sectors'
                        : sectors?.map(({ name }) =>
                            <React.Fragment key={name}>
                                <Responsive
                                    as={SectorSegment}
                                    name={name}
                                    style={{ margin: '0.3em', flexGrow: 1, textAlign: 'center' }}
                                    minWidth={500}
                                />
                                <Responsive
                                    as={SectorSegment}
                                    name={name}
                                    style={{ margin: '0.2em', width: '48%'  }}
                                    maxWidth={500}
                                />
                            </React.Fragment>
                        )
                    )
                }
            </div>
        </Container>
    )
}

export default MarketSectors