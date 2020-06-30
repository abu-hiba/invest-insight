import React from 'react'
import CSS from 'csstype'
import { round2Dp } from '../utils/number'

const green = (color: string | undefined) => color ? 'rgb(0, 255, 0)' : 'green'

interface PriceProps {
    price: number,
    change: number,
    changePercent: number,
    style?: CSS.Properties,
    color?: string
}

export const PriceAttribution = () => (
    <p style={{ fontSize: '11px', color: '#545454' }}>
        Prices provided by <a href="https://iexcloud.io" target="_blank" rel="noopener noreferrer">IEX Cloud</a>
    </p>
)

const Price: React.FC<PriceProps> = ({ price, change, changePercent, style, color }) => (
    <p style={{ marginBottom: 0, ...style }}>
        <span style={{ fontSize: '18px', fontWeight: 'bold', color: color ? color : '#000' }}>
            {price}{' '}
        </span>
        <span style={{ color: change >= 0 ? green(color) : 'rgb(255,0,0)', fontSize: '16px' }}>
            {change >= 0 && '+'}{change}{' '}
            ({round2Dp(changePercent * 100)}%)
        </span>
    </p>
)

export default Price