import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Item, Header } from 'semantic-ui-react'
import CSS from 'csstype'
import { useEventStream } from '../../containers/IexContainer'
import Price from '../../components/Price'

interface WatchlistItemProps {
    symbol: string
}

const ItemContainer: CSS.Properties = {
    backgroundColor: '#222',
    padding: '0.75em',
    borderRadius: '5px'
}

const ItemImage: CSS.Properties = {
    width: '64px',
    height: '64px',
    marginRight: '10px',
    borderRadius: '5px'
}

const WatchlistItem: React.FC<WatchlistItemProps> = ({ symbol }) => {
    const { openStream, closeStream, event } = useEventStream()
    const { latestPrice, change, changePercent } = { ...event }

    useEffect(() => {
        openStream([symbol])
        return closeStream
    }, [])
    
    return (
        <Item key={symbol} as={Link} to={`/company/${symbol}`} style={{ margin: '1em 0' }}>
            <div style={ItemContainer}>
                <Item.Content>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <img
                            src={`${process.env.LOGO_URL}/${symbol}.png`}
                            style={ItemImage}
                        />
                        <div>
                            <Header as='h3' style={{ marginBottom: '0.5rem', color: '#FFF' }}>{symbol}{' '}</Header>
                            {event && <Price
                                price={latestPrice!}
                                change={change!}
                                changePercent={changePercent!}
                                color='#FFF'
                            />}
                        </div>
                    </div>
                </Item.Content>
            </div>
        </Item>
    )
}

export default WatchlistItem