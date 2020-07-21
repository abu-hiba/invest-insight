import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'
import { BasicContainer } from '../../interfaces'

interface DarkSegmentProps extends BasicContainer {
    linkTo?: string,
    href?: string,
    noHover?: boolean
}

const DarkSegment: React.FC<DarkSegmentProps> = ({ children, linkTo, href, style, noHover }) => {
    const [hovered, setHovered] = useState(false)
    return (
        <Segment
            as={linkTo && Link}
            to={linkTo}
            href={href && href}
            target={href && "_blank"}
            rel={href && "noopener noreferrer"}
            onMouseOver={() => setHovered(noHover ? false : true)}
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