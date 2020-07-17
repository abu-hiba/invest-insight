import React, { useState } from 'react'
import { Responsive, Button } from 'semantic-ui-react'
import CompanySegment from './CompanySegment'
import { InternationalSymbol, Quote } from '../../interfaces'
import SegmentContainer from './SegmentContainer'
import { useHistory, useLocation } from 'react-router-dom'
import { parseQueryString } from '../../utils/string'

interface ExpandableCompanyListProps {
    items?: (Quote | InternationalSymbol)[],
    loading: boolean,
    error?: Error,
    itemsPerInterval: number
}

const ExpandableCompanyList: React.FC<ExpandableCompanyListProps> = ({
    items,
    loading,
    error,
    itemsPerInterval
}) => {
    const history = useHistory()
    const { pathname, search } = useLocation()
    const { itemsOnPage } = parseQueryString(search)

    const minItems = itemsOnPage ? (
        Number(itemsOnPage) < itemsPerInterval ? itemsPerInterval : Number(itemsOnPage)
    ) : itemsPerInterval

    const [itemsShowing, setItemsShowing] = useState(minItems)

    const incrementBy = (items: any[]): number => {
        const diff = items.length - itemsShowing
        return diff >= itemsPerInterval ? itemsPerInterval : diff
    }

    return (
        <>
            <SegmentContainer>
                {!loading ? (
                    error ? error.message : (
                        items?.map((item, i) => {
                            const { name, companyName } = { ...item }
                            return i < itemsShowing && (
                                <React.Fragment key={item.symbol}>
                                    <Responsive
                                        as={CompanySegment}
                                        name={name}
                                        style={{ margin: '0.3em', flexGrow: 1, width: '250px' }}
                                        minWidth={500}
                                        {...item}
                                        companyName={name ? name : companyName}
                                    />
                                    <Responsive
                                        as={CompanySegment}
                                        name={name}
                                        style={{ margin: '0.2em', width: '100%' }}
                                        maxWidth={500}
                                        {...item}
                                        companyName={name ? name : companyName}
                                    />
                                </React.Fragment> 
                            )
                        })
                    )
                ) : 'Loading'}
            </SegmentContainer>
            {items && itemsShowing < items.length && (
                <div style={{ display: 'block', textAlign: 'center' }}>
                    <Button
                        onClick={() => {
                            setItemsShowing(prev => {
                                const next = prev + incrementBy(items)
                                history.push(`${pathname}?itemsOnPage=${next}`)
                                return next
                            })
                        }}
                        color='black'
                    >
                        Load More
                    </Button>
                </div>
            )}
        </>
    )
}

export default ExpandableCompanyList