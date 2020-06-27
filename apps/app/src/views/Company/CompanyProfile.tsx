import React from 'react'
import { Segment, Placeholder } from 'semantic-ui-react'
import { CompanyState } from '../../containers/IexContainer'

const CompanyProfile: React.FC<{ company: CompanyState }> = ({ company }) => {
    const { data, loading, error } = company
    return (
        <Segment>
            {loading ? (
                <Placeholder>
                    <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
                ) : error ? <>{error.message}</> : (
                    <p>{data?.description}</p>
                )
            }
        </Segment>
    )
}

export default CompanyProfile