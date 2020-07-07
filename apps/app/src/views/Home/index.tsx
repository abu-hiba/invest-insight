import React from 'react'
import WatchList from './WatchList'
import CompanyList from './CompanyList'
import { useAuth } from '../../containers/AuthContext'
import { useList } from '../../containers/IexContainer'

const flexList = {
    flex: '1 1 30%',
    minWidth: '290px'
}

const Home = () => {
    const { user } = useAuth()
    const gainersList = useList('gainers')
    const losersList = useList('losers')

    return (
        <>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <WatchList user={user} style={flexList}/>
                <CompanyList list={gainersList!} header='Top Gainers' style={flexList}/>
                <CompanyList list={losersList!} header='Top Losers' style={flexList}/>
            </div>
        </>
    )
}

export default Home
