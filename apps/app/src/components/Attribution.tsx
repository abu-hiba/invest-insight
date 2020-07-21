import React from 'react'
import { Icon } from 'semantic-ui-react'
import CSS from 'csstype'

const IexAttribution: React.FC<{ style?: CSS.Properties }> = ({ style }) => 
    <a
        href="https://iexcloud.io"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#666', ...style }}
    >
        Data provided by IEX Cloud <sup><Icon name='external alternate' /></sup>
    </a>

export default IexAttribution