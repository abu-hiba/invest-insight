import React, { ReactNode, useState, useEffect, useContext, createContext } from 'react'
import iiApi from '../services/iiApi' 
import { User } from '../interfaces'

export interface Auth {
    data: User | null,
    loading: boolean,
    error?: Error
}

export interface AuthCtx {
    user: Auth,
    signIn: Function,
    signUp: Function,
    signOut: Function,
    pwdReset: Function
}

const AuthContext = createContext<AuthCtx>({
    user: { data: null, loading: true },
    signIn: () => {},
    signUp: () => {},
    signOut: () => {},
    pwdReset: () => {}
})

export const ProvideAuth: React.FC<{ children: ReactNode }> = ({ children }) => {
    const auth = useProvideAuth()
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

const useProvideAuth = () => {
    const [user, setUser] = useState<Auth>({ data: null, loading: true })

    const signIn = (username: string, password: string): void => {
        iiApi<User, User>('post', '/auth/sign-in', { username, password })
            .then(user => setUser({ data: user, loading: false }))
            .catch(error => setUser({ data: null, loading: false, error }))
    }

    const signUp = (username: string, email: string, password:string): void => {
        iiApi<User, User>('post', '/auth/register', { username, email, password })
            .then(user => setUser({ data: user, loading: false }))
            .catch(error => setUser({ data: null, loading: false, error }))
    } 

    const signOut = (): void => {
        iiApi('post', '/auth/sign-out')
            .then(() => setUser({ data: null, loading: false }))
            .catch(error => setUser({ data: null, loading: false, error }))
    }

    const pwdReset = () => {}

    useEffect(() => {
       //TODO implement /auth/me endpoint 
    }, [])

    return {
        user,
        signIn,
        signUp,
        signOut,
        pwdReset
    }
}

