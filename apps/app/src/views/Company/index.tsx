import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CompanyProfile from './CompanyProfile'
import { useCompany, useCompanyNews, useEventStream } from '../../containers/IexContainer'
import { CompanyNewsItem, NewsItems } from './CompanyNews'
import CompanyHeader from './CompanyHeader'
import CompanyBreadcrumb from './CompanyBreadcrumb'
import AddToWatchlist from './AddToWatchlist'

const CompanyPage: React.FC = () => {
    const { symbol } = useParams() 
    const { company, fetchCompany } = useCompany(symbol!)
    const { news, fetchNews } = useCompanyNews(symbol!, 4)
    const { openStream, closeStream, event } = useEventStream()

    useEffect(() => {
        fetchCompany(symbol!)
        fetchNews(symbol!, 4)
        openStream([symbol!])

        return closeStream
    }, [symbol])

    const { data } = company

    const sections = [
        { key: 'Markets', content: 'Markets', linkTo: '/markets' },
        { key: data?.sector, content: data?.sector, linkTo: `/sector/${data?.sector}` },
        { key: symbol, content: symbol?.toUpperCase(), active: true }
    ]

    return (
        <div style={{ margin: '1em 0' }}>
            {data?.sector && (
                <CompanyBreadcrumb
                    sections={sections}
                    style={{ margin: '0 1em' }}
                />
            )}
            <CompanyHeader company={company} event={event!} style={{ margin: '10px' }} />
            <AddToWatchlist style={{ margin: '10px' }} />
            <CompanyProfile company={company} />
            <NewsItems>
                {news?.items?.map(item =>
                    <CompanyNewsItem
                        key={item.headline}
                        loading={news.loading}
                        {...item}
                    />
                )}            
            </NewsItems>
        </div>
    )  
}

export default CompanyPage