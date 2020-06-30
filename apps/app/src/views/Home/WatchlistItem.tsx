import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Item, Header } from 'semantic-ui-react'
import CSS from 'csstype'
import Price from '../../components/Price'
import { Quote } from '../../interfaces'

interface WatchlistItemProps {
    symbol: string,
    event: Quote | undefined
}

const ItemContainer: CSS.Properties = {
    backgroundColor: '#2b2c2d',
    padding: '0.75em',
    borderRadius: '5px'
}

const ItemImage: CSS.Properties = {
    width: '64px',
    height: '64px',
    marginRight: '10px',
    borderRadius: '5px'
}

const WatchlistItem: React.FC<WatchlistItemProps> = ({ symbol, event }) => {
    const [symbolEvent, setSymbolEvent] = useState<Quote>()

    const { latestPrice, change, changePercent } = { ...symbolEvent }

    useEffect(() => {
        event?.symbol === symbol && setSymbolEvent(event) 
    }, [event])
    
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
                            <Header
                                as='h3'
                                style={{ marginBottom: '0.5rem', color: '#FFF' }}
                            >{symbol}{' '}</Header>
                            <Price
                                price={latestPrice}
                                change={change}
                                changePercent={changePercent}
                                color='#FFF'
                            />
                        </div>
                    </div>
                </Item.Content>
            </div>
        </Item>
    )
}

export default WatchlistItem