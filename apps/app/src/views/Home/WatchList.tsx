import React, { useEffect } from 'react'
import { Item, Header } from 'semantic-ui-react'
import CSS from 'csstype'
import { Auth } from '../../containers/AuthContext'
import ListItem from './ListItem'
import { useEventStream } from '../../containers/IexContainer'
import SectionContainer from '../../components/Layout/SectionContainer'

interface WatchListProps {
    user: Auth,
    style?: CSS.Properties
}

const WatchList: React.FC<WatchListProps> = ({ user, style }) => {
    const { userData, loading, error } = user
    const { openStream, closeStream, event } = useEventStream()

    useEffect(() => {
        userData && openStream(userData?.watchlist!)
        return closeStream
    }, [])

    return (
        <SectionContainer style={style}>
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
                                    <ListItem
                                        key={symbol}
                                        symbol={symbol}
                                        event={event}
                                    />
                            )}
                        </Item.Group>
                    )
                )
            )}
        </SectionContainer>
    )
}

export default WatchList