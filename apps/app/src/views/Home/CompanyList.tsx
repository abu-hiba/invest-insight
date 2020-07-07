import React from 'react'
import { ListState } from '../../containers/IexContainer'
import PageContainer from '../../components/Layout/PageContainer'
import { Header } from 'semantic-ui-react'
import CSS from 'csstype'
import ListItem from './ListItem'

interface CompanyListProps {
    list: ListState,
    header: string,
    style?: CSS.Properties
}

const CompanyList: React.FC<CompanyListProps> = ({ list, header, style }) => {
    return (
        <PageContainer style={style}>
            <Header as='h2' style={{ color: '#FFF' }}>{header}</Header>
            {!list || list?.loading ? (
                <>Loading...</>
            ) : list?.error ? <>{list.error.message}</> :  (
                list?.quotes?.map(quote => (
                    <ListItem
                        key={quote.symbol}
                        symbol={quote.symbol}
                        event={quote}
                    />
                ))
            )}
        </PageContainer>
    )
}

export default CompanyList