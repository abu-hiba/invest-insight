import React, { useState } from 'react'
import Navbar from './Nav/Navbar'
import MobileMenu from './Nav/MobileMenu'

export interface AppShellProps { children: React.ReactNode }

const AppShell = ({ children }: AppShellProps) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu)
    const menuItems = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Markets',
            path: '/markets'
        },
        {
            name: 'Profile',
            path: '/profile'
        }
    ]
    return (
        <>
            <Navbar items={menuItems} toggleMobileMenu={toggleMobileMenu} />
            <MobileMenu items={menuItems} show={showMobileMenu} setShow={setShowMobileMenu}>
                {children}
            </MobileMenu>
        </>
    )
}

export default AppShell
