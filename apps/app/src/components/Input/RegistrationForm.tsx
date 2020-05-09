import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'

export interface RegistrationVals {
    username: string,
    email: string,
    password: string
}

export interface RegistrationFormProps {
    onSubmit: Function
}

const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    return (
        <Form onSubmit={(): void => onSubmit(username, email, password)}>
            <Form.Input
                name='Username'
                placeholder='Username'
                value={username}
                onChange={(e, { value }) => setUsername(value)}
            />
            <Form.Input
                name='Email'
                placeholder='Email'
                value={email}
                onChange={(e, { value }) => setEmail(value)}
            />
            <Form.Input
                name='Password'
                placeholder='Password'
                type='password'
                value={password}
                onChange={(e, { value }) => setPassword(value)}
            />
            <Form.Button>Register</Form.Button>
        </Form>
    )
}

export default RegistrationForm
