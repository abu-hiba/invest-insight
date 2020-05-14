import React from 'react'
import { Card, Placeholder } from 'semantic-ui-react'

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

const CompanyNewsItem = ({ loading, headline, source, summary, url }: CompanyNewsItemProps) => (
    loading ?
        <Placeholder
            as={Card}
        />
    : 
        <Card
            href={url}
            header={headline}
            meta={source}
            description={summary}
        />
)

export default CompanyNewsItem