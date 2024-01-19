import { FC, useState } from 'react';
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

    const reqIDString: string | null = localStorage.getItem("reqID");
    const reqID: number = reqIDString ? parseInt(reqIDString, 10) : 0;

    const handleLogout = () => {
        if (userToken) {
            dispatch(logoutUser(userToken));
            navigate('/resources/');
            window.location.reload()
        }
    };

    return ( 
        <Navbar className="navbar" expand="lg">
            <Navbar.Brand className="navbar-logo"
            onClick={() => (navigate(`/resources`))}>
                Добыча ресурсов
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="navbar-blocks mr-auto">
                    <Nav.Link className="navbar-block"
                     onClick={() => (navigate(`/resources`))}>
                        Список ресурсов
                    </Nav.Link>
                </Nav>
                <Nav>
                    {!userToken && (
                        <Nav.Link className="navbar-block" 
                        onClick={() => (navigate(`/auth`))}>
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
                                {(userRole !== '2') && (
                                    <NavDropdown.Item
                                        className="navbar-block"
                                        onClick={() => {
                                            navigate(`/reports/${reqID}`);
                                            setShowDropdown(false);
                                        }}
                                    >
                                        Корзина
                                    </NavDropdown.Item>
                                )}
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
                                {(userRole === '1') && (
                                    <NavDropdown.Item
                                        className="navbar-block"
                                        onClick={() => {
                                            navigate('/resources/new');
                                            setShowDropdown(false);
                                        }}
                                    >
                                        Добавление или<br />
                                        редактирование ресурсов
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