import React from 'react'
import { Redirect } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'
import SignInForm from '../components/Input/SignInForm'
import { useAuth } from '../containers/AuthContext'
import FormContainer from '../components/Layout/FormContainer'

const SignIn = () => {
    const { user, signIn } = useAuth()

    return !user.userData ? (
        <FormContainer>
            <SignInForm onSubmit={signIn} />
        </FormContainer>
    ) : (
        <Redirect to={{ pathname: '/' }} />
    )
}

export default SignIn