import React from 'react'
import { useParams } from 'react-router-dom'
import { Header, Responsive } from 'semantic-ui-react'
import { useExchange } from '../../containers/IexContainer'
import BreadcrumbBar from '../../components/Nav/BreadcrumbBar'
import SectionContainer from '../../components/Layout/SectionContainer'
import SegmentContainer from '../../components/Layout/SegmentContainer'
import CompanySegment from '../../components/Layout/CompanySegment'

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
                                        as={CompanySegment}
                                        name={name}
                                        style={{ margin: '0.3em', flexGrow: 1, width: '250px' }}
                                        minWidth={500}
                                        {...quote}
                                        companyName={quote.name}
                                    />
                                    <Responsive
                                        as={CompanySegment}
                                        name={name}
                                        style={{ margin: '0.2em', width: '100%' }}
                                        maxWidth={500}
                                        {...quote}
                                        companyName={quote.name}
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