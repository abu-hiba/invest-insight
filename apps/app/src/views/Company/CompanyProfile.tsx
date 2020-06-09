import React from 'react'
import { Segment, Placeholder, Image } from 'semantic-ui-react'
import CSS from 'csstype'
import { CompanyState } from '../../containers/IexContainer'

interface CompanyHeaderProps {
    symbol: string,
    companyName: string,
    sector: string,
    style: CSS.Properties
}

const CompanyHeaderText: CSS.Properties = {
    marginLeft: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
}

const CompanyHeaderImage: CSS.Properties = {
    width: '96px',
    height: 'auto',
    flexShrink: 0,
    borderRadius: '5px'
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({ symbol, companyName, sector, style }) => (
    <div style={{ display: 'flex', ...style }}>
        <img
            src={`${process.env.LOGO_URL}/${symbol}.png`}
            style={CompanyHeaderImage}
        />
        <div style={CompanyHeaderText}>
            <h2 style={{ margin: '0 0 10px 0' }}>{symbol} | {companyName}</h2>
            <h4 style={{ margin: 0 }}>{sector}</h4>
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
                            sector={data!.sector!}
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