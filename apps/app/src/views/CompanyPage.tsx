import React from 'react'
import { useParams } from 'react-router-dom'
import CompanyProfile from './CompanyProfile'
import { useCompany } from '../containers/IexContainer'
// import { Company } from '../interfaces'

const CompanyPage = () => {
    const { symbol } = useParams()
    const company = useCompany(symbol as string)

    return <CompanyProfile company={company} />  
}

export default CompanyPage