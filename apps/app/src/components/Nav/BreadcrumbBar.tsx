
import React from 'react'
import { Breadcrumb } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import CSS from 'csstype'

interface BreadcrumbSection {
    content?: string,
    linkTo?: string,
    active?: boolean,
    key?: string
}

interface BreadcrumbBarProps {
    sections: BreadcrumbSection[],
    style?: CSS.Properties
}

const BreadcrumbBar: React.FC<BreadcrumbBarProps> = ({ sections, style }) => (
    <Breadcrumb style={{ margin: 0, ...style }}>
        {sections.map(({ content, linkTo, active, key }, i, arr) =>
            linkTo ? (
                <React.Fragment key={key}>
                    <Breadcrumb.Section as={Link} to={linkTo}>
                        {content}
                    </Breadcrumb.Section>
                    {i !== (arr.length - 1) && <Breadcrumb.Divider icon='right angle' style={{ color: '#fff' }} />}
                </React.Fragment>
            ) : (
                <React.Fragment key={key}>
                    <Breadcrumb.Section active={active} style={{ color: '#fff' }}>
                        {content}
                    </Breadcrumb.Section>
                    {i !== (arr.length - 1) && <Breadcrumb.Divider icon='right angle' />}
                </React.Fragment>
            )
        )}
    </Breadcrumb>
)

export default BreadcrumbBar