import React from 'react'
import { useParams } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import { useSector } from '../../containers/IexContainer'
import BreadcrumbBar from '../../components/Nav/BreadcrumbBar'
import SectionContainer from '../../components/Layout/SectionContainer'
import ExpandableCompanyList from '../../components/Layout/ExpandableCompanyList'

const SectorPage: React.FC = () => {
    const { name } = useParams()
    const { sectorData } = useSector(name!)

    const sections = [
        { key: 'Markets', content: 'Markets', linkTo: '/markets' },
        { key: name, content: name, active: true }
    ]

    return (
        <SectionContainer>
            {name && <BreadcrumbBar sections={sections} />}
            <Header as='h2' style={{ color: '#fff' }}>{name}</Header>
            <ExpandableCompanyList {...sectorData} />
        </SectionContainer>
    )
}

export default SectorPage