import React, { ReactNode, useState, useEffect, useContext, createContext } from 'react'
import iiApi from '../services/iiApi' 
import { User } from '../interfaces'

export interface Auth {
    userData: User | null,
    loading: boolean,
    error?: Error
}

export interface AuthCtx {
    user: Auth,
    signIn: Function,
    signUp: Function,
    signOut: Function,
    pwdReset: Function,
    addToWatchlist: Function,
    removeFromWatchlist: Function
}

const AuthContext = createContext<AuthCtx>({
    user: { userData: null, loading: true },
    signIn: () => {},
    signUp: () => {},
    signOut: () => {},
    pwdReset: () => {},
    addToWatchlist: () => {},
    removeFromWatchlist: () => {}
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
    const [user, setUser] = useState<Auth>({ userData: null, loading: true })

    const signIn = (username: string, password: string): void => {
        iiApi<User, User>('post', '/auth/sign-in', { username, password })
            .then(user => setUser({ userData: user, loading: false }))
            .catch(error => setUser({ userData: null, loading: false, error }))
    }

    const signUp = (username: string, email: string, password:string): void => {
        iiApi<User, User>('post', '/auth/register', { username, email, password })
            .then(user => setUser({ userData: user, loading: false }))
            .catch(error => setUser({ userData: null, loading: false, error }))
    } 

    const signOut = (): void => {
        iiApi('post', '/auth/sign-out')
            .then(() => setUser({ userData: null, loading: false }))
            .catch(error => setUser({ userData: null, loading: false, error }))
    }

    const pwdReset = () => {}

    const fetchCurrentUser = () =>
        iiApi<{ user: User }>('get', '/auth/me').then(({ user }) => user)

    const clearUser = () => setUser({ userData: null, loading: false })

    const addToWatchlist = (symbol: string) =>
        iiApi<User>('post', `/user/watchlist/${symbol}`)
            .then(user => setUser({ userData: user, loading: false }))
            .catch(error => setUser({ userData: null, loading: false, error }))

    const removeFromWatchlist = (symbol: string) =>
        iiApi<User>('delete', `/user/watchlist/${symbol}`)
            .then(user => setUser({ userData: user, loading: false }))
            .catch(error => setUser({ userData: null, loading: false, error }))

    useEffect(() => {
       if (!user.userData) {
        fetchCurrentUser()
            .then(data => setUser({ userData: data, loading: false }))
            .catch(clearUser)
       } 
    }, [])

    return {
        user,
        signIn,
        signUp,
        signOut,
        pwdReset,
        addToWatchlist,
        removeFromWatchlist
    }
}

