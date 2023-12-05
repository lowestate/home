import React from 'react';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

const NavigationMain: React.FC = () => {
    return (
        <Navbar className="navbar" expand="lg">
            <Navbar.Brand className="navbar-logo" href="/resources">Список ресурсов</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="navbar-blocks">
                    <Nav.Link className="navbar-block" href="/resources">Ваши заявки</Nav.Link>
                </Nav>
                <Nav className="navbar-blocks">
                    <Nav.Link className="navbar-profile" href="/logout">Выход</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationMain;