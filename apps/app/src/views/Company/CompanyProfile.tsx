import React from 'react'
import { Segment, Placeholder, Header, Image } from 'semantic-ui-react'
import CSS from 'csstype'
import { CompanyState } from '../../containers/IexContainer'

const CompanyHeaderText: CSS.Properties = {
    marginLeft: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
}

const CompanyHeaderImage: CSS.Properties = {
    // width: '96px',
    // height: 'auto',
    flexShrink: 0,
    borderRadius: '5px'
}

interface CompanyHeaderProps {
    symbol: string,
    companyName: string,
    industry: string,
    style: CSS.Properties
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({ symbol, companyName, industry, style }) => (
    <div style={{ display: 'flex', ...style }}>
        <Image
            src={`${process.env.LOGO_URL}/${symbol}.png`}
            size='tiny'
            style={CompanyHeaderImage}
        />
        <div style={CompanyHeaderText}>
            <Header as='h3' style={{ margin: '0 0 10px 0' }}>
                {symbol}{' '}|{' '}
                <span style={{ color: '#545454' }}>{companyName}</span>
            </Header>
            <Header sub style={{ margin: '0' }}>{industry}</Header>
        </div>
    </div>
)

const CompanyProfile: React.FC<{ company: CompanyState }> = ({ company }) => {
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
                        <CompanyHeader
                            symbol={data!.symbol}
                            companyName={data!.companyName!}
                            industry={data!.industry!}
                            style={{ marginBottom: '10px' }}
                        />
                        <p>{data?.description}</p>
                    </>
                )
            }
        </Segment>
    )
}

export default CompanyProfile