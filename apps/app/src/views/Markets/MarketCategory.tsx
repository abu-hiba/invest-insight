import React from 'react'
import { Responsive, Header } from 'semantic-ui-react'
import CSS from 'csstype'
import SectionContainer from '../../components/Layout/SectionContainer'
import DarkSegment from '../../components/Layout/DarkSegment'
import SegmentContainer from '../../components/Layout/SegmentContainer'
import { Sector, Exchange } from '../../interfaces'
import { MarketCategory } from '../../containers/IexContainer'

interface CategorySegmentProps {
    name: string,
    style?: CSS.Properties
}

const CategorySegment: React.FC<CategorySegmentProps> = ({ name, style }) => (
    <DarkSegment
        linkTo={`/sector/${name}`}
        style={{ display: 'flex', alignItems: 'center', ...style }}
    >
        <h4 style={{ color: '#FFF' }}>
            {name}
        </h4>
    </DarkSegment>
)

interface CategoryProps {
    category: MarketCategory<Sector[] | Exchange[]> | undefined,
    header: string
}

const Category: React.FC<CategoryProps> = ({ category, header }) => {
    const { data, loading, error } = { ...category }
    return (
        <SectionContainer>
            <Header as='h2' style={{ color: '#FFF' }} dividing>{header}</Header>
            <SegmentContainer>
                {loading || !category
                    ? <span style={{ color: '#FFF' }}>Loading...</span>
                    : (error
                        ? 'Error loading market sectors'
                        : data?.map(({ name, description }: { name: string, description: string }) =>
                            <React.Fragment key={name || description}>
                                <Responsive
                                    as={CategorySegment}
                                    name={name || description}
                                    style={{ margin: '0.3em', flexGrow: 1, textAlign: 'center' }}
                                    minWidth={500}
                                />
                                <Responsive
                                    as={CategorySegment}
                                    name={name || description}
                                    style={{ margin: '0.2em', width: '48%'  }}
                                    maxWidth={500}
                                />
                            </React.Fragment>
                        )
                    )
                }
            </SegmentContainer>
        </SectionContainer>
    )
}

export default Category