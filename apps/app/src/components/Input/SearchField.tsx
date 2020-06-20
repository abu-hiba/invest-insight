import React, { MouseEvent, SyntheticEvent } from 'react'
import { Search, SearchProps, SearchResultData } from 'semantic-ui-react'
import { useSearch } from '../../containers/IexContainer'

export interface SearchFieldProps extends SearchProps { }

const SearchField = (props: SearchFieldProps) => {
    const { searchState: { results, loading }, companySearch } = useSearch()

    const searchResults = results?.map(({ symbol, securityName }) => (
        {
            title: symbol,
            description: securityName
        }
    ))

    const handleSearchChange = (e: MouseEvent, { value }: SearchProps) => {
        value && companySearch(value)
    }

    const handleResultSelect = (e: SyntheticEvent, { result }: SearchResultData) => {
        const url = `${process.env.HOST_URL}/company/${result.title}`
        location.href = url
    }

    return (
        <Search
            onSearchChange={handleSearchChange} // Possibly add a debounce
            onResultSelect={handleResultSelect}
            loading={loading}
            results={searchResults}
            showNoResults={false}
            {...props}
        />
    )
}

export default SearchField
