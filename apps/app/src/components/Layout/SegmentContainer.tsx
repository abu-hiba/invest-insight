import React, { ReactNode } from 'react'
import CSS from 'csstype'

interface SegmentContainerProps {
    children: ReactNode,
    style?: CSS.Properties
}

const container: CSS.Properties = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'space-between'
}

const SegmentContainer: React.FC<SegmentContainerProps> = ({ children, style }) => (
    <div style={{ ...container, ...style }}>
        {children}
    </div>
)

export default SegmentContainer