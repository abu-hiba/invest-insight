import React, { ReactNode } from 'react'
import CSS from 'csstype'

interface PageContainerProps {
    children: ReactNode,
    style?: CSS.Properties
}

const pageContainerStyle: CSS.Properties = {
    padding: '2em 1em 1em 1em',
    borderRadius: '10px',
    backgroundColor: '#1b1c1d',
    margin: '1em'
}

const PageContainer: React.FC<PageContainerProps> = ({ children, style }) => (
    <div style={{ ...pageContainerStyle, ...style }}>
        {children}
    </div>
)

export default PageContainer