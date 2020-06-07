import React from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

const SectorPage: React.FC = () => {
    const { name } = useParams()
    return (
        <Container>
            <h2>{name}</h2>
        </Container>
    )
}

export default SectorPage