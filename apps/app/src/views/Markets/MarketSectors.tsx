import React from 'react'
import { Responsive, Header } from 'semantic-ui-react'
import CSS from 'csstype'
import { useMarketRefData } from '../../containers/IexContainer'
import PageContainer from '../../components/Layout/PageContainer'
import DarkSegment from '../../components/Layout/DarkSegment'

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

const SectorSegment: React.FC<SectorSegmentProps> = ({ name, style }) => (
    <DarkSegment
        linkTo={`/sector/${name}`}
        style={{ display: 'flex', alignItems: 'center', ...style }}
    >
        <h4 style={{ color: '#FFF' }}>
            {name}
        </h4>
    </DarkSegment>
)

const MarketSectors: React.FC = () => {
    const { sectors, loading, error } = useMarketRefData()
    return (
        <PageContainer>
            <Header as='h2' style={{ color: '#FFF' }} dividing>Market Sectors</Header>
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
        </PageContainer>
    )
}

export default MarketSectors