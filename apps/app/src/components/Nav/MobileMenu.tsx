import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sidebar, Segment, Menu, Image, Button } from 'semantic-ui-react'
import { MenuItem } from './Navbar'

export interface MobileMenuProps {
    items: MenuItem[],
    children: React.ReactNode,
    show: boolean,
    setShow: Function
}

const MobileMenu = ({ items, children, show, setShow }: MobileMenuProps) => {
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
                    <Button basic inverted>Log In</Button>
                    <Button basic inverted style={{ marginTop: '0.5em' }}>Sign Up</Button>
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
