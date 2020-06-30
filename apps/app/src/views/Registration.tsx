import React from 'react'
import { Redirect } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'
import { useAuth } from '../containers/AuthContext'
import RegistrationForm from '../components/Input/RegistrationForm'

const Registration = () => {
    const { user, signUp } = useAuth()

    return !user.userData ? (
        <Segment>
            <RegistrationForm onSubmit={signUp} />
        </Segment>
    ) : (
        <Redirect to={{ pathname: '/' }} />
    )
}

export default Registration