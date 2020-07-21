import React from 'react'
import { Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import CSS from 'csstype'
import { useAuth } from '../../containers/AuthContext'

interface AddToWatchlistProps {
    symbol: string,
    style?: CSS.Properties
}

const WatchlistButton: React.FC<AddToWatchlistProps> = ({ symbol, style }) => {
    const { user: { userData: data }, addToWatchlist, removeFromWatchlist } = useAuth()
    const history = useHistory()

    const handleClick = (symbol: string) => {
        if (data) {
            data.watchlist?.includes(symbol)
                ? removeFromWatchlist(symbol)
                : addToWatchlist(symbol)
        } else {
            history.push('/sign-in')
        }
    }

    const watching = data?.watchlist?.includes(symbol)

    return (
        <div style={style}>
            <Button onClick={() => handleClick(symbol)} color={watching ? 'red' : 'blue'}>
                {watching
                    ? <>&minus; Remove from Watchlist</>
                    : '+ Add to watchlist'
                }
            </Button>
        </div>
    )
}

export default WatchlistButton