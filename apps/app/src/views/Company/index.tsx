import React from 'react'
import { useParams } from 'react-router-dom'
import CompanyProfile from './CompanyProfile'
import { useCompany, useCompanyNews } from '../../containers/IexContainer'
import CompanyNewsItem from './CompanyNews'

const CompanyPage = () => {
    const { symbol } = useParams() 
    const company = useCompany(symbol as string)
    const news = useCompanyNews(symbol as string, 10)

    return (
        <>
            <CompanyProfile company={company} />

            {news?.items?.map(item => (
                <CompanyNewsItem loading={news.loading} {...item} />
            ))}            
        </>
    )  
}

export default CompanyPage