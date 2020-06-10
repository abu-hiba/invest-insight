import React, { ReactNode, Fragment } from 'react'
import { Card, Placeholder, Header } from 'semantic-ui-react'

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
    loading ? (
        <Placeholder
            as={Card}
            fluid
        />
    ) : (
        <Card href={url} target="_blank" fluid>
            <Card.Content>
                <Card.Header as='h5'>{headline}</Card.Header>
                <Card.Meta>{source}</Card.Meta>
                <Card.Description>{summary}</Card.Description>
            </Card.Content>
        </Card>
    )
)

export const NewsItems: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div style={{ margin: '2em 1em' }}>
        <Header as ='h3'>News</Header>
        <Card.Group>
            {React.Children.map(children, (child, i) =>
                <Fragment key={i}>{child}</Fragment>
            )}
        </Card.Group>
    </div>
)