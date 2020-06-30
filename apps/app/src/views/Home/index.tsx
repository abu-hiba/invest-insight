import React from 'react'
import Watchlist from './Watchlist'
import { useAuth } from '../../containers/AuthContext'

const Home = () => {
    const { user } = useAuth()
    return (
        <>
            <Watchlist user={user} style={{ margin: '1em' }} />
        </>
    )
}

export default Home
