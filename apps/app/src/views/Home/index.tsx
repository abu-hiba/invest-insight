import React from 'react'
import WatchList from './WatchList'
import CompanyList from './CompanyList'
import { useAuth } from '../../containers/AuthContext'
import { useList } from '../../containers/IexContainer'

const Home = () => {
    const { user } = useAuth()
    const gainersList = useList('gainers')
    const losersList = useList('losers')

    return (
        <>
            <WatchList user={user} />
            <CompanyList list={gainersList!} header='Top Gainers' />
            <CompanyList list={losersList!} header='Top Losers' />
        </>
    )
}

export default Home
