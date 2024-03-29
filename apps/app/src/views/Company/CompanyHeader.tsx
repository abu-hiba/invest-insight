import React from 'react'
import CSS from 'csstype'
import { Placeholder, Header, Image } from 'semantic-ui-react'
import { CompanyState } from '../../containers/IexContainer'
import { Quote } from '../../interfaces'
import Price, { PriceAttribution } from '../../components/Price'

const CompanyHeaderText: CSS.Properties = {
    marginLeft: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
}

const CompanyHeaderImage: CSS.Properties = {
    flexShrink: 0,
    borderRadius: '5px',
    height: '90px',
    width: '90px'
}

interface CompanyHeaderProps {
    company: CompanyState,
    event: Quote,
    style?: CSS.Properties
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({ company, event, style }) => {
    const { data, loading, error } = company
    const { symbol, companyName, industry } = { ...data }
    const { latestPrice, change, changePercent } = { ...event }

    return (
        <div style={{ display: 'flex', ...style }}>
            {loading ? (
                <>
                    <Placeholder>
                        <Placeholder.Image />
                        <Placeholder.Header as='h2'/>
                        <Placeholder.Header as='h3'/>
                        <Placeholder.Header as='h4'/>
                    </Placeholder>
                </>
            ) : error ? <>{error.message}</> : (
                <>
                    <Image
                        src={`${process.env.LOGO_URL}/${data?.symbol}.png`}
                        style={CompanyHeaderImage}
                    />
                    <div style={CompanyHeaderText}>
                        <Header as='h3' style={{ margin: '0 0 10px 0', color: '#fff' }}>
                            {symbol}{' '}|{' '}
                            <span style={{ color: '#fff', fontWeight: 'normal' }}>{companyName}</span>
                        </Header>
                        <Header sub style={{ margin: '0 0 10px 0', color: '#fff' }}>{industry}</Header>
                        <Price
                            price={event?.symbol === data?.symbol ? latestPrice : undefined}
                            change={event?.symbol === data?.symbol ? change : undefined}
                            changePercent={event?.symbol === data?.symbol ? changePercent : undefined}
                            color='#FFF'
                        />
                        <PriceAttribution/>
                    </div>
                </>
            )}
        </div>
    )
}

export default CompanyHeader