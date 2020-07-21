import React, { useEffect, useState } from 'react'
import { Header } from 'semantic-ui-react'
import CSS from 'csstype'
import Price from '../../components/Price'
import { Quote } from '../../interfaces'
import DarkSegment from '../../components/Layout/DarkSegment'

interface ListItemProps {
    symbol: string,
    event: Quote | undefined
}

const ItemImage: CSS.Properties = {
    width: '64px',
    height: '64px',
    marginRight: '10px',
    borderRadius: '5px'
}

const ListItem: React.FC<ListItemProps> = ({ symbol, event }) => {
    const [symbolEvent, setSymbolEvent] = useState<Quote>()

    const { latestPrice, change, changePercent } = { ...symbolEvent }

    useEffect(() => {
        event?.symbol === symbol && setSymbolEvent(event) 
    }, [event])
    
    return (
        <DarkSegment
            linkTo={`/company/${symbol}`}
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
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
        </DarkSegment>
    )
}

export default ListItem