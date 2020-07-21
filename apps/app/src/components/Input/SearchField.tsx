import React, { MouseEvent, SyntheticEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { Search, SearchProps, SearchResultData } from 'semantic-ui-react'
import { useSearch } from '../../containers/IexContainer'

export interface SearchFieldProps extends SearchProps { }

const SearchField = (props: SearchFieldProps) => {
    const { searchState: { results, loading }, companySearch } = useSearch()
    let history = useHistory()

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
        history.push(`/company/${result.title}`)
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
