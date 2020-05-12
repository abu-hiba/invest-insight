import React from 'react'
import { Segment } from 'semantic-ui-react'

export interface Company {
    symbol: string,
    companyName: string,
    exchange: string,
    industry: string,
    website?: string,
    description: string,
    CEO: string,
    securityName: string,
    issueType: string,
    sector: string,
    primarySicCode: number,
    employees: number,
    tags: string[],
    address: string,
    address2?: string,
    state: string,
    zip: string,
    country: string,
    phone: string,
}

export interface CompanyProfileProps {
    company: Company
}

const CompanyProfile = ({ company }: CompanyProfileProps) => {
    const { symbol, companyName, industry, description } = company
    return (
        <Segment>
            <h2>{symbol}</h2>
            <h3>{companyName}</h3>
            <h4>{industry}</h4>
            <p>{description}</p>
        </Segment>
    )
}

export default CompanyProfile