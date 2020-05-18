import React from 'react'
import { useParams } from 'react-router-dom'
import CompanyProfile from './CompanyProfile'
import { useCompany, useCompanyNews } from '../../containers/IexContainer'
import { CompanyNewsItem, NewsItems } from './CompanyNews'

const CompanyPage: React.FC = () => {
    const { symbol } = useParams() 
    const company = useCompany(symbol!)
    const news = useCompanyNews(symbol!, 10)

    return (
        <>
            <CompanyProfile company={company} />
            <NewsItems>
                {news?.items?.map(item => (
                    <CompanyNewsItem key={item.headline} loading={news.loading} {...item} />
                ))}            
            </NewsItems>
        </>
    )  
}

export default CompanyPage