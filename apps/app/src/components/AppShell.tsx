import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from './Nav/Navbar'
import MobileMenu from './Nav/MobileMenu'
import { useAuth } from '../containers/AuthContext'

export interface AppShellProps { children: React.ReactNode }

const AppShell = ({ children }: AppShellProps) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu)

    const auth = useAuth()
    const history = useHistory()

    const signOutAndExit = (): void => {
        history.push('/')
        auth.signOut()
    }

    const menuItems = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Markets',
            path: '/markets'
        },
    ]
    return (
        <>
            <Navbar
                items={menuItems}
                auth={auth}
                toggleMobileMenu={toggleMobileMenu}
                signOut={signOutAndExit}
            />
            <MobileMenu
                items={menuItems}
                auth={auth}
                show={showMobileMenu}
                setShow={setShowMobileMenu}
                signOut={signOutAndExit}
            >
                {children}
            </MobileMenu>
        </>
    )
}

export default AppShell
