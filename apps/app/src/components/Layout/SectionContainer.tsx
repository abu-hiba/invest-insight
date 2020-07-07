import React from 'react'
import CSS from 'csstype'
import { BasicContainer } from '../../interfaces'

const sectionContainer: CSS.Properties = {
    padding: '2em 1em 1em 1em',
    borderRadius: '10px',
    backgroundColor: '#1b1c1d',
    margin: '1em'
}

const SectionContainer: React.FC<BasicContainer> = ({ children, style }) => (
    <div style={{ ...sectionContainer, ...style }}>
        {children}
    </div>
)

export default SectionContainer