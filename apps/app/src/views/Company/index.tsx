import React from 'react'
import { useParams } from 'react-router-dom'
import { Breadcrumb } from 'semantic-ui-react'
import CompanyProfile from './CompanyProfile'
import { useCompany, useCompanyNews } from '../../containers/IexContainer'
import { CompanyNewsItem, NewsItems } from './CompanyNews'

const CompanyPage: React.FC = () => {
    const { symbol } = useParams() 
    const company = useCompany(symbol!)
    const news = useCompanyNews(symbol!, 4)

    const { data } = company

    const sections = [
        { key: 'Markets', content: 'Markets', href: '/markets' },
        { key: data?.sector, content: data?.sector, href: `/sector/${data?.sector}` },
        { key: symbol, content: symbol?.toUpperCase(), active: true }
    ]

    return (
        <div style={{ margin: '1em 0' }}>
            {data?.sector && (
                <Breadcrumb
                    icon='right angle'
                    sections={sections}
                    style={{ margin: '0 1em' }}
                />
            )}
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