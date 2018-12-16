import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { Menu, Container, Image } from 'semantic-ui-react'

export default class NavMenu extends Component {
    render() {
        return (
            <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item header>
                        <Image size='mini' src='/logo.jpg' style={{ marginRight: '1.5em' }} to='/'/>
                        Project Name
                    </Menu.Item>
                    <Menu.Item as={Link} to='/' >Home</Menu.Item>
                    <Menu.Item as={Link} to='/counter' >Counter</Menu.Item>
                    <Menu.Item as={Link} to='/food' >Food</Menu.Item>
                </Container>
            </Menu>
        )
    }
}