import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sidebar, Segment, Menu, Icon, Button } from 'semantic-ui-react'
import { MenuItem } from './Navbar'
import { AuthCtx } from '../../containers/AuthContext'

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
    const handleClick = (name: string) => setActiveItem(name) 

    useEffect(() => {
        setVisible(show)
    }, [show]) 

    return (
        <Sidebar.Pushable as={Segment}  style={{ border: 'none', borderRadius: '0', marginTop: '0' }}>
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
                <Menu.Item>
                    {auth.user.data ? (
                        <>
                            <Button
                                as={Link}
                                to='/profile'
                                basic
                                inverted
                            ><Icon name='user circle' />Profile</Button>
                            <Button
                                basic
                                inverted
                                style={{ marginTop: '0.5em' }}
                                onClick={signOut}
                            >Sign Out</Button>
                        </>
                    ) : (
                        <>
                            <Button
                                as={Link}
                                to='/sign-in'
                                basic
                                inverted
                            >Log In</Button>
                            <Button
                                as={Link}
                                to='/'
                                basic
                                inverted
                                style={{ marginTop: '0.5em' }}
                            >Sign Up</Button>
                        </>
                    )}   
                </Menu.Item>
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

            <Sidebar.Pusher>
                {children}
            </Sidebar.Pusher>
        </Sidebar.Pushable> 
    )
}

export default MobileMenu
