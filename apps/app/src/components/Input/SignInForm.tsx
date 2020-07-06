import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'

export interface SignInVals {
    username: string,
    password: string
}

export interface SignInFormProps {
    onSubmit: Function
}

const SignInForm = ({ onSubmit }: SignInFormProps) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    return (
        <Form onSubmit={() => onSubmit(username, password)}>
            <Form.Input
                name='Username'
                placeholder='Username'
                value={username}
                onChange={(e, { value }) => setUsername(value)}
            />
            <Form.Input
                name='Password'
                placeholder='Password'
                type='password'
                value={password}
                onChange={(e, { value }) => setPassword(value)}
            />
            <Form.Button color='blue' style={{ width: '100%' }}>Log In</Form.Button>
        </Form>
    )
}

export default SignInForm
