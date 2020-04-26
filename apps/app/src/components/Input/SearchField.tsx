import React from 'react'
import { Search, SearchProps } from 'semantic-ui-react'

export interface SearchFieldProps extends SearchProps { }

const SearchField = ({ size }: SearchFieldProps) => {
    
    return (
        <Search size={size}/>
    )
}

export default SearchField
