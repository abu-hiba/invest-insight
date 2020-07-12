import React from 'react'
import { Header, Image } from 'semantic-ui-react'
import LazyLoad from 'react-lazyload'
import CSS from 'csstype'
import DarkSegment from './DarkSegment'

interface CompanySegmentProps {
    companyName: string,
    symbol: string,
    style?: CSS.Properties
}

const CompanySegment: React.FC<CompanySegmentProps> = ({
    companyName,
    symbol,
    style
}) => (
    <DarkSegment
        linkTo={`/company/${symbol}`}
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            ...style
        }}
    >
        <div>
            <Header style={{ color: '#fff' }}>{symbol}</Header>
            <p style={{ color: '#fff' }}>{companyName}</p>
        </div>
        <LazyLoad once={true} offset={300}>
            <Image
                src={`${process.env.LOGO_URL}/${symbol}.png`}
                style={{ width: '50px', height: '50px', borderRadius: '5px' }}
            />
        </LazyLoad>
    </DarkSegment>
)

export default CompanySegment