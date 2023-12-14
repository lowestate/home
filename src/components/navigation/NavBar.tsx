import React, { FC, useState } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import '../../styles/navBar.style.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../modules/auth_actions';
import store, { useAppDispatch } from '../../store/store';

const NavigationMain: FC = () => {
    const { userToken, userRole, userName } = useSelector((state: ReturnType<typeof store.getState>) => state.auth);
    const [showDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        if (userToken) {
            dispatch(logoutUser(userToken));
            navigate('/resources/');
        }
    };

    return ( 
        <Navbar className="navbar" expand="lg">
            <Navbar.Brand className="navbar-logo" href="/resources">
                Добыча ресурсов
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="navbar-blocks mr-auto">
                    <Nav.Link className="navbar-block" href="/resources">
                        Список ресурсов
                    </Nav.Link>
                </Nav>
                <Nav>
                    {!userToken && (
                        <Nav.Link className="navbar-block" href="/auth">
                            Вход
                        </Nav.Link>
                    )}
                    {userToken && (
                        <NavDropdown
                            className="nav-dropdown"
                                title={userName}
                                id="basic-nav-dropdown"
                                show={showDropdown}
                                onMouseEnter={() => setShowDropdown(true)}
                                onMouseLeave={() => setShowDropdown(false)}
                                align={{ lg: 'end' }}
                            >
                                <NavDropdown.Item
                                    className="navbar-block"
                                    onClick={() => {
                                        navigate('/profile');
                                        setShowDropdown(false);
                                    }}
                                >
                                    Личный кабинет
                                </NavDropdown.Item>
                                {(userRole === '0' || userRole === '1') && (
                                    <NavDropdown.Item
                                        className="navbar-block"
                                        onClick={() => {
                                            navigate('/reports');
                                            setShowDropdown(false);
                                        }}
                                    >
                                        Заявки
                                    </NavDropdown.Item>
                                )}
                                <NavDropdown.Item
                                    className="navbar-block"
                                    onClick={() => {
                                        handleLogout();
                                        setShowDropdown(false);
                                    }}
                                >
                                    Выйти
                                </NavDropdown.Item>    
                        </NavDropdown>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationMain;