import React from 'react'
import { useParams } from 'react-router-dom'
import { Image, Header, Responsive } from 'semantic-ui-react'
import LazyLoad from 'react-lazyload'
import CSS from 'csstype'
import { useExchange } from '../../containers/IexContainer'
import BreadcrumbBar from '../../components/Nav/BreadcrumbBar'
import SectionContainer from '../../components/Layout/SectionContainer'
import DarkSegment from '../../components/Layout/DarkSegment'
import SegmentContainer from '../../components/Layout/SegmentContainer'

interface SectorCompanyProps {
    companyName: string,
    symbol: string,
    style?: CSS.Properties
}

const SectorCompany: React.FC<SectorCompanyProps> = ({
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
        <LazyLoad once={true}>
            <Image
                src={`${process.env.LOGO_URL}/${symbol}.png`}
                style={{ width: '50px', height: '50px', borderRadius: '5px' }}
            />
        </LazyLoad>
    </DarkSegment>
)

const ExchangePage: React.FC = () => {
    const { name, description } = useParams()
    const { exchangeData: { quotes, loading, error } } = useExchange(name!)

    const sections = [
        { key: 'Markets', content: 'Markets', linkTo: '/markets' },
        { key: name, content: name, active: true }
    ]
     
    return (
        <SectionContainer>
            {name && <BreadcrumbBar sections={sections} />}
            <Header as='h2' style={{ color: '#fff' }}>{description}</Header>
            <SegmentContainer>
                {!loading ? (
                    error ? error.message : (
                        quotes?.map((quote, i) =>
                            i < 50 && 
                                <React.Fragment key={quote.symbol}>
                                    <Responsive
                                        as={SectorCompany}
                                        name={name}
                                        style={{ margin: '0.3em', flexGrow: 1, width: '250px' }}
                                        minWidth={500}
                                        {...quote}
                                    />
                                    <Responsive
                                        as={SectorCompany}
                                        name={name}
                                        style={{ margin: '0.2em', width: '100%' }}
                                        maxWidth={500}
                                        {...quote}
                                    />
                                </React.Fragment> 
                        )
                    )
                ) : 'Loading'}
                </SegmentContainer>
        </SectionContainer>
    )
}

export default ExchangePage