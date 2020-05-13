import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sidebar, Segment, Menu, Icon, Button } from 'semantic-ui-react'
import { AuthCtx } from '../../containers/AuthContext'
import { MenuItem } from '../../interfaces'

export interface MobileMenuProps {
    items: MenuItem[],
    auth: AuthCtx,
    children: React.ReactNode,
    show: boolean,
    setShow: Function,
    signOut: any // TODO: find correct type
}

const MobileMenu = ({ items, auth, children, show, setShow, signOut }: MobileMenuProps) => {
    const [visible, setVisible] = useState(false)
    const [activeItem, setActiveItem] = useState("")
    const handleClick = (name: string): void => {
        setActiveItem(name)
        setVisible(false)
    } 

    useEffect(() => {
        setVisible(show)
    }, [show]) 

    return (
        <Sidebar.Pushable
            as={Segment}
            style={{ border: 'none', borderRadius: '0', marginTop: '0' }}
        >
            <Sidebar
                as={Menu}
                animation="overlay"
                inverted
                vertical
                onHide={() => setShow(false)}
                visible={visible}
                width="thin"
                borderless
            >
                {auth.user.data ? (
                    <>
                        <Menu.Item
                            as={Link}
                            to='/profile'
                            name='profile'
                            active={activeItem === name}
                            onClick={() => handleClick(name)}
                        ><Icon name='user circle' />Profile</Menu.Item>
                        <Menu.Item
                            style={{ marginTop: '0.5em' }}
                            onClick={signOut}
                        >Sign Out</Menu.Item>
                    </>
                ) : (
                    <>
                        <Menu.Item
                            as={Link}
                            to='/sign-in'
                            name='signin'
                            active={activeItem === 'signin'}
                            onClick={() => handleClick('signin')}
                        >Log In</Menu.Item>
                        <Menu.Item
                            as={Link}
                            to='/registration'
                            name='signup'
                            style={{ marginTop: '0.5em' }}
                            active={activeItem === 'signup'}
                            onClick={() => handleClick('signup')}
                        >Sign Up</Menu.Item>
                    </>
                )}   
                {items.map(({ name, path }: MenuItem) => (
                    <Menu.Item
                        key={name}
                        as={Link}
                        to={path}
                        name={name}
                        active={activeItem === name}
                        onClick={() => handleClick(name)}
                    />
                ))} 
            </Sidebar> 
            <Sidebar.Pusher
                style={{ minHeight: `${window.screen.height}px` }}
            >
                {children}
            </Sidebar.Pusher>
        </Sidebar.Pushable> 
    )
}

export default MobileMenu
