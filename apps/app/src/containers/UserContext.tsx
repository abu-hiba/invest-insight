import React, { ReactNode, useState, useEffect, useContext, createContext } from 'react'
import iiApi from '../services/iiApi' 

const UserContext = createContext({ user: { data: null, loading: true } })

export const ProvideAuth = ({ children }: { children: ReactNode }) => {
    const auth = useProvideAuth()
    return (
        <UserContext.Provider value={auth}>
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = () => useContext(UserContext)

const useProvideAuth = () => {
    const [user, setUser] = useState({ data: null, loading: true })

    const signIn = () => {}

    const signUp = () => {} 

    const signOut = () => {}

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

