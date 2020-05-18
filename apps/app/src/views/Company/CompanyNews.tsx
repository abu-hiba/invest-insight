import React, { ReactNode } from 'react'
import { Card, Placeholder, Segment, Header } from 'semantic-ui-react'

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
}) => (
    loading ?
        <Placeholder
            as={Card}
            fluid
        />
    : 
        <Card
            href={url}
            target="_blank"
            header={headline}
            meta={source}
            description={summary}
            fluid
        />
)

export const NewsItems: React.FC<{ children: ReactNode }> = ({ children }) => (
    <Segment>
        <Header as ='h3'>News</Header>
        <Segment.Group>
            {React.Children.map(children, (child, i) => <Segment key={i}>{child}</Segment>)}
        </Segment.Group>
    </Segment>
)