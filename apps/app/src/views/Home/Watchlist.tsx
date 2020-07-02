import React, { useEffect } from 'react'
import { Item, Header } from 'semantic-ui-react'
import CSS from 'csstype'
import { Auth } from '../../containers/AuthContext'
import WatchlistItem from './WatchlistItem'
import { useEventStream } from '../../containers/IexContainer'
import PageContainer from '../../components/Layout/PageContainer'

interface WatchlistProps {
    user: Auth,
    style?: CSS.Properties
}

const Watchlist: React.FC<WatchlistProps> = ({ user, style }) => {
    const { userData, loading, error } = user
    const { openStream, closeStream, event } = useEventStream()

    useEffect(() => {
        userData && openStream(userData?.watchlist!)
        return closeStream
    }, [])

    return (
        <PageContainer style={style}>
            <Header as='h2' style={{ color: '#FFF' }}>Watchlist</Header>
            {!userData ? (
                <p style={{ color: '#FFF', fontSize: '1.2rem' }}>Search for assets to add to your watchlist</p>
            ) : (
                loading ? (
                    <>Loading...</>
                ) : (
                    error ? (
                        <>{error.message}</>
                    ) : (
                        <Item.Group>
                            {userData.watchlist?.map(symbol =>
                                    <WatchlistItem
                                        key={symbol}
                                        symbol={symbol}
                                        event={event}
                                    />
                            )}
                        </Item.Group>
                    )
                )
            )}
        </PageContainer>
    )
}

export default Watchlist