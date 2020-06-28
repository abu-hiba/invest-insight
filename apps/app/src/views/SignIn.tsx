import React from 'react'
import { Redirect } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'
import SignInForm from '../components/Input/SignInForm'
import { useAuth } from '../containers/AuthContext'

const SignIn = () => {
    const { user, signIn } = useAuth()

    return !user.userData ? (
        <Segment>
            <SignInForm onSubmit={signIn} />
        </Segment>
    ) : (
        <Redirect to={{ pathname: '/' }} />
    )
}

export default SignIn