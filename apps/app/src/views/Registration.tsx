import React from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../containers/AuthContext'
import RegistrationForm from '../components/Input/RegistrationForm'
import FormContainer from '../components/Layout/FormContainer'

const Registration = () => {
    const { user, signUp } = useAuth()

    return !user.userData ? (
        <FormContainer>
            <RegistrationForm onSubmit={signUp} />
        </FormContainer>
    ) : (
        <Redirect to={{ pathname: '/' }} />
    )
}

export default Registration