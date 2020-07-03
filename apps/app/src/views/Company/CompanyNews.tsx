import React, { ReactNode, Fragment } from 'react'
import { Card, Placeholder, Header } from 'semantic-ui-react'
import DarkSegment from '../../components/Layout/DarkSegment'

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
    url,
    lang
}) => loading ? (
    <Placeholder
        as={Card}
        fluid
    />
) : lang === 'en' ? (
    <DarkSegment href={url}>
        <h4 style={{ color: '#FFF', margin: '0 0 0.5rem 0' }}>{headline}</h4>
        <h5 style={{ color: '#999', margin: '0 0 1rem 0' }}>{source}</h5>
        <p style={{ color: '#FFF' }}>{summary}</p>
    </DarkSegment>
) : null

export const NewsItems: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div style={{ margin: '2em 1em' }}>
        <Header as ='h3' style={{ color: '#FFF' }}>News</Header>
        <Card.Group>
            {React.Children.map(children, (child, i) =>
                <Fragment key={i}>{child}</Fragment>
            )}
        </Card.Group>
    </div>
)