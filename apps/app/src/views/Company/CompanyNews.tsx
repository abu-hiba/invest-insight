import React, { ReactNode, Fragment } from 'react'
import { Card, Placeholder, Header, Responsive } from 'semantic-ui-react'
import CSS from 'csstype'
import DarkSegment from '../../components/Layout/DarkSegment'

const newsItemContainer: CSS.Properties = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'space-between'
}

export interface CompanyNewsItemProps {
    loading: boolean,
    datetime: number,
    headline: string,
    source: string,
    summary: string,
    url: string,
    related: string,
    image: string,
    lang: string,
    hasPayWall: boolean
}

export const CompanyNewsItem: React.FC<CompanyNewsItemProps> = ({
    loading,
    headline,
    source,
    summary,
    url
}) => loading ? (
    <Placeholder
        as={Card}
        fluid
    />
) : (
    <DarkSegment href={url} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <h4 style={{ color: '#FFF', margin: '0 0 0.5rem 0' }}>{headline}</h4>
        <h5 style={{ color: '#999', margin: '0 0 1rem 0' }}>{source}</h5>
        <p style={{ color: '#FFF' }}>{summary}</p>
    </DarkSegment>
)

export const NewsItems: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div style={{ margin: '2em 1em' }}>
        <Header as ='h3' style={{ color: '#FFF' }}>News</Header>
        <div style={newsItemContainer}>
            {React.Children.map(children, (child, i) =>
                <Fragment key={i}>
                    <Responsive
                        style={{ margin: '0.3em', flexGrow: 1, width: '250px' }}
                        minWidth={500}
                    >
                        {child}
                    </Responsive>
                    <Responsive
                        style={{ margin: '0.2em', width: '100%' }}
                        maxWidth={500}
                    >
                        {child}
                    </Responsive>
                </Fragment>
            )}
        </div>
    </div>
)