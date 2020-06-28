import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Menu, Button, Image, Icon, Responsive } from 'semantic-ui-react'
import SearchField from '../Input/SearchField'
import { AuthCtx } from '../../containers/AuthContext'
import { MenuItem } from '../../interfaces'
import { NoEmitOnErrorsPlugin } from 'webpack'

export interface NavbarProps {
    items: MenuItem[],
    auth: AuthCtx,
    toggleMobileMenu: Function,
    signOut: any // TODO: find correct type
}

const menuContainer = {
    borderRadius: 0,
    border: 'none',
    padding: '0.5em 1em',
    margin: 0,
    maxWidth: `${window.screen.width}px`
}

const Navbar = ({ items, auth, toggleMobileMenu, signOut }: NavbarProps) => {
    const [activeItem, setActiveItem] = useState("")  
    const handleClick = (name: string) => setActiveItem(name) 
    return (
        <Segment
            attached='top'
            inverted
            style={menuContainer}
        >
            <Menu inverted size='large' secondary style={{ padding: '0.5em' }}>
                <Responsive
                    onClick={() => toggleMobileMenu()}
                    maxWidth={770}
                    className="item"
                    style={{ marginLeft: 0, paddingLeft: 0 }}
                >
                    <Icon name="bars" size="large"/>
                </Responsive>
                <Responsive as={Menu.Item} minWidth={770} style={{ paddingLeft: 0 }}>
                    <Image src="/src/public/iilogo_white.png" size="small"/>
                </Responsive>
                <Responsive
                    as={Menu.Item}
                    minWidth={330}
                    maxWidth={770}
                    style={{ paddingLeft: 0, marginLeft: 0 }}
                >
                <Image src="/src/public/iilogo_white.png" size="tiny"/>
                </Responsive>
                <Responsive as={React.Fragment} minWidth={770}>
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
                </Responsive>
                <Responsive as={Menu.Item} minWidth={770}>
                    <SearchField size="small"/>
                </Responsive>
                <Responsive as={Menu.Item} maxWidth={770} style={{ marginLeft: 0, paddingLeft: 0 }}>
                    <SearchField size="mini"/>
                </Responsive>
                <Responsive as={Menu.Menu} minWidth={770} position="right">
                    <Menu.Item>
                        {auth.user.userData ? (
                            <>
                                <Link to='/profile'>
                                    <Button
                                        basic
                                        inverted
                                        name='profile'
                                        active={activeItem === 'profile'}
                                        onClick={() => handleClick('profile')}
                                    ><Icon name='user circle' />Profile</Button>
                                </Link>
                                <Button
                                    basic
                                    inverted
                                    style={{ marginLeft: '0.5em' }}
                                    onClick={signOut}
                                >Sign Out</Button>
                            </>
                        ) : (
                            <>
                                <Link to='/sign-in'>
                                    <Button
                                        basic
                                        inverted
                                        name='signin'
                                        active={activeItem === 'signin'}
                                        onClick={() => handleClick('signin')}
                                    >Log In</Button>
                                </Link>
                                <Button
                                    as={Link}
                                    to='/registration'
                                    basic
                                    inverted
                                    name='signup'
                                    active={activeItem === 'signup'}
                                    onClick={() => handleClick('signup')}
                                    style={{ marginLeft: '0.5em' }}
                                >Sign Up</Button>
                            </>
                        )}
                    </Menu.Item>
                </Responsive>
            </Menu>
        </Segment>
    )
}

export default Navbar
