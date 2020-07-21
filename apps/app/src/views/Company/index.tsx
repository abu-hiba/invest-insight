import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CompanyProfile from './CompanyProfile'
import { useCompany, useCompanyNews, useEventStream } from '../../containers/IexContainer'
import { CompanyNewsItem, NewsItems } from './CompanyNews'
import CompanyHeader from './CompanyHeader'
import WatchlistButton from './WatchlistButton'
import BreadcrumbBar from '../../components/Nav/BreadcrumbBar'
import SectionContainer from '../../components/Layout/SectionContainer'

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
        <>
            <SectionContainer>
                {data?.sector && (
                    <BreadcrumbBar
                        sections={sections}
                        style={{ marginBottom: '1em' }}
                    />
                )}
                <CompanyHeader company={company} event={event!} style={{ margin: '10px' }} />
                <WatchlistButton
                    symbol={symbol!}
                    style={{ margin: '10px' }}
                />
                <CompanyProfile company={company} />
                <NewsItems>
                    {news.items?.filter(({ lang }) => lang === 'en')
                        .map(item =>
                            <CompanyNewsItem
                                key={item.headline}
                                loading={news.loading}
                                {...item}
                            />
                        )
                    }            
                </NewsItems>
            </SectionContainer>
        </>
    )  
}

export default CompanyPage