import React from 'react'
import { useParams } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import { useExchange } from '../../containers/IexContainer'
import BreadcrumbBar from '../../components/Nav/BreadcrumbBar'
import SectionContainer from '../../components/Layout/SectionContainer'
import ExpandableCompanyList from '../../components/Layout/ExpandableCompanyList'

const ExchangePage: React.FC = () => {
    const { name, description } = useParams()
    const { exchangeData } = useExchange(name!)

    const sections = [
        { key: 'Markets', content: 'Markets', linkTo: '/markets' },
        { key: name, content: name, active: true }
    ]
     
    return (
        <SectionContainer>
            {name && <BreadcrumbBar sections={sections} />}
            <Header as='h2' style={{ color: '#fff' }}>{description}</Header>
            <ExpandableCompanyList {...exchangeData} />
        </SectionContainer>
    )
}

export default ExchangePage