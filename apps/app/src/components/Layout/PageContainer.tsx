import React from 'react'
import CSS from 'csstype'
import { BasicContainer } from '../../interfaces'

const pageContainer: CSS.Properties = {
    padding: '2em 1em 1em 1em',
    borderRadius: '10px',
    backgroundColor: '#1b1c1d',
    margin: '1em'
}

const PageContainer: React.FC<BasicContainer> = ({ children, style }) => (
    <div style={{ ...pageContainer, ...style }}>
        {children}
    </div>
)

export default PageContainer