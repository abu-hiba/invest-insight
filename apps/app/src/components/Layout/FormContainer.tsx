import React from 'react'
import { Responsive } from 'semantic-ui-react'
import CSS from 'csstype'
import DarkSegment from './DarkSegment'
import { BasicContainer } from '../../interfaces'

const formSegment: CSS.Properties = {
    maxWidth: '375px',
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '40px 20px',
    margin: '0 auto'
}

const FormContainer: React.FC<BasicContainer> = ({ children, style }) => (
    <>
        <Responsive maxWidth={500}>
            <DarkSegment noHover style={{ ...formSegment, ...style }}>
                {children}
            </DarkSegment>
        </Responsive>
        <Responsive minWidth={500}>
            <DarkSegment noHover style={{ ...formSegment, marginTop: '90px', ...style }}>
                {children}
            </DarkSegment>
        </Responsive>
    </>
)

export default FormContainer