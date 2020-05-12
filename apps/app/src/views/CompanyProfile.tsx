import React from 'react'
import { Segment, Placeholder } from 'semantic-ui-react'
// import { Company } from '../interfaces'
import { CompanyState } from '../containers/IexContainer'

export interface CompanyProfileProps {
    company: CompanyState
}

const CompanyProfile = ({ company }: CompanyProfileProps) => {
    const { data, loading, error } = company
    return (
        <Segment>
            {loading ? (
                <Placeholder>
                    <Placeholder.Header as='h2'/>
                    <Placeholder.Header as='h3'/>
                    <Placeholder.Header as='h4'/>
                    <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
                ) : error ? (
                    <>{error.message}</>
                ) : (
                    <>
                        <h2>{data?.symbol}</h2>
                        <h3>{data?.companyName}</h3>
                        <h4>{data?.industry}</h4>
                        <p>{data?.description}</p>
                    </>
                )
            }
        </Segment>
    )
}

export default CompanyProfile