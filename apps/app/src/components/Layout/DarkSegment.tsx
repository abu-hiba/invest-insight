import React, { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'
import CSS from 'csstype'

interface DarkSegmentProps {
    children: ReactNode,
    linkTo?: string,
    style?: CSS.Properties
}

const DarkSegment: React.FC<DarkSegmentProps> = ({ children, linkTo, style }) => {
    const [hovered, setHovered] = useState(false)
    return (
        <Segment
            as={linkTo && Link}
            to={linkTo}
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
            style={{
                backgroundColor: hovered ? '#3b3c3d' : '#2b2c2d',
                borderBottom: hovered ? '2px solid #5B5C5D' : '2px solid #3B3C3D',
                cursor: hovered ? 'pointer' : 'normal',
                ...style
            }}
        >
            {children}
        </Segment>
    )
}

export default DarkSegment