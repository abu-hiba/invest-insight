import React from 'react'
import { ListState } from '../../containers/IexContainer'
import SectionContainer from '../../components/Layout/SectionContainer'
import { Header } from 'semantic-ui-react'
import CSS from 'csstype'
import ListItem from './ListItem'
import { Quote } from '../../interfaces'

interface CompanyListProps {
    list: ListState<Quote>,
    header: string,
    style?: CSS.Properties
}

const CompanyList: React.FC<CompanyListProps> = ({ list, header, style }) => {
    return (
        <SectionContainer style={style}>
            <Header as='h2' style={{ color: '#FFF' }}>{header}</Header>
            {!list || list.loading ? (
                <>Loading...</>
            ) : list.error ? <>{list.error.message}</> : (
                list.items?.map((quote: Quote) => (
                    <ListItem
                        key={quote.symbol}
                        symbol={quote.symbol}
                        event={quote}
                    />
                ))
            )}
        </SectionContainer>
    )
}

export default CompanyList