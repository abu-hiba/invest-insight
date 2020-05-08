import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Menu, Button, Image, Icon, Responsive } from 'semantic-ui-react'
import SearchField from '../Input/SearchField'
import { AuthCtx } from '../../containers/AuthContext'

export interface MenuItem { name: string, path: string } 
export interface NavbarProps {
    items: MenuItem[],
    auth: AuthCtx,
    toggleMobileMenu: Function,
    signOut: any // TODO: find correct type
}

const Navbar = ({ items, auth, toggleMobileMenu, signOut }: NavbarProps) => {
    const [activeItem, setActiveItem] = useState("")  
    const handleClick = (name: string) => setActiveItem(name) 
    return (
        <Segment attached='top' inverted style={{ borderRadius: 0, padding: '0.5em 1em', marginBottom: 0 }}>
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
                                    style={{ marginLeft: '0.5em' }}
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
