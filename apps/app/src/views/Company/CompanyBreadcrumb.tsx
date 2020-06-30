
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

interface CompanyBreadcrumbProps {
    sections: BreadcrumbSection[],
    style?: CSS.Properties
}

const CompanyBreadcrumb: React.FC<CompanyBreadcrumbProps> = ({ sections, style }) => (
    <Breadcrumb style={style}>
        {sections.map(({ content, linkTo, active, key }, i, arr) =>
            linkTo ? (
                <React.Fragment key={key}>
                    <Breadcrumb.Section as={Link} to={linkTo}>
                        {content}
                    </Breadcrumb.Section>
                    {i !== (arr.length - 1) && <Breadcrumb.Divider icon='right angle' />}
                </React.Fragment>
            ) : (
                <React.Fragment key={key}>
                    <Breadcrumb.Section active={active}>
                        {content}
                    </Breadcrumb.Section>
                    {i !== (arr.length - 1) && <Breadcrumb.Divider icon='right angle' />}
                </React.Fragment>
            )
        )}
    </Breadcrumb>
)

export default CompanyBreadcrumb