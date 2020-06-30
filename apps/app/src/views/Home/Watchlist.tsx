import React from 'react'
import { Item, Header } from 'semantic-ui-react'
import CSS from 'csstype'
import { useAuth } from '../../containers/AuthContext'
import WatchlistItem from './WatchlistItem'

interface WatchlistProps {
    style?: CSS.Properties
}

const Watchlist: React.FC<WatchlistProps> = ({ style }) => {
    const { user: { userData, loading, error } } = useAuth()
    return (
        <div style={style}>
            <Header as='h2'>Watchlist</Header>
            {!userData ? (
                <></>
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