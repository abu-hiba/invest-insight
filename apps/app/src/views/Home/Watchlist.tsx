import React, { useEffect } from 'react'
import { Item, Header } from 'semantic-ui-react'
import CSS from 'csstype'
import { Auth } from '../../containers/AuthContext'
import WatchlistItem from './WatchlistItem'
import { useEventStream } from '../../containers/IexContainer'

interface WatchlistProps {
    user: Auth,
    style?: CSS.Properties
}

const watchlistContainer: CSS.Properties = {
    padding: '2em 1em 1em 1em',
    borderRadius: '10px',
    backgroundColor: '#1b1c1d'
}

const Watchlist: React.FC<WatchlistProps> = ({ user, style }) => {
    const { userData, loading, error } = user
    const { openStream, closeStream, event } = useEventStream()

    useEffect(() => {
        userData && openStream(userData?.watchlist!)
        return closeStream
    }, [])

    return (
        <div style={{ ...watchlistContainer, ...style }}>
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
        </div>
    )
}

export default Watchlist