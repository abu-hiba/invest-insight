import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Image, Header } from 'semantic-ui-react'
import LazyLoad from 'react-lazyload'
import CSS from 'csstype'
import { useSector } from '../../containers/IexContainer'
import BreadcrumbBar from '../../components/Nav/BreadcrumbBar'
import PageContainer from '../../components/Layout/PageContainer'
import DarkSegment from '../../components/Layout/DarkSegment'

interface SectorCompanyProps {
    companyName: string,
    symbol: string,
    open: number,
    close: number,
    high: number,
    low: number,
    style?: CSS.Properties
}

const SectorCompany: React.FC<SectorCompanyProps> = ({
    companyName,
    symbol,
    style
}) => (
    <DarkSegment linkTo={`/company/${symbol}`} style={{ display: 'flex', justifyContent: 'space-between', ...style }}>
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

const SectorPage: React.FC = () => {
    const { name } = useParams()
    const { sectorData: { quotes, loading, error } } = useSector(name!)

    const sections = [
        { key: 'Markets', content: 'Markets', linkTo: '/markets' },
        { key: name, content: name, active: true }
    ]
     
    return (
        <>
            <PageContainer>
                {name && <BreadcrumbBar sections={sections} />}
                <Header as='h2' style={{ color: '#fff' }}>{name}</Header>
                <Container>
                    {!loading ? (
                        error ? error.message : (
                            <div>
                                {quotes?.map((quote, i) =>
                                    i < 50 && 
                                        <SectorCompany
                                            key={quote.symbol}
                                            {...quote}
                                            style={{ margin: '0.5em' }}
                                        />
                                )}
                            </div>
                        )
                    ) : 'Loading'}
                </Container>
            </PageContainer>
        </>
    )
}

export default SectorPage