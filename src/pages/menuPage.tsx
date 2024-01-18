import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from '../store/store';

const MenuPage = () => {
    const { userRole, userToken } = useSelector((state: ReturnType<typeof store.getState>) => state.auth);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh'}}>
            <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', width: '400px' }}>
                <h2 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>Меню</h2>

                <table style={{ margin: '0 auto', width: '80%' }}>
                    <tbody>
                        {!userToken && (
                            <>
                                <tr>
                                    <td>
                                        <Link to="/login" style={{ textDecoration: 'none' }}>
                                            <div style={{ background: '#333', padding: '10px', borderRadius: '5px', textAlign: 'center', marginBottom: '10px' }}>
                                                <span style={{ color: 'white', fontSize: '18px' }}>Войти</span>
                                            </div>
                                        </Link>
                                    </td>
                                </tr>
                            </>
                        )}
                        <tr>
                            <td>
                                <Link to="/resources" style={{ textDecoration: 'none' }}>
                                    <div style={{ background: '#333', padding: '10px', borderRadius: '5px', textAlign: 'center', marginBottom: '10px' }}>
                                        <span style={{ color: 'white', fontSize: '18px' }}>Ресурсы</span>
                                    </div>
                                </Link>
                            </td>
                        </tr>
                        {userRole === '1' && (
                            <tr>
                                <td>
                                    <Link to="/resources/edit" style={{ textDecoration: 'none' }}>
                                        <div style={{ background: '#333', padding: '10px', borderRadius: '5px', textAlign: 'center', marginBottom: '10px' }}>
                                            <span style={{ color: 'white', fontSize: '18px' }}>Создание или редактирование ресурсов</span>
                                        </div>
                                    </Link>
                                </td>
                            </tr>
                        )}
                        {userToken && (
                            <tr>
                                <td>
                                    <Link to="/reports" style={{ textDecoration: 'none' }}>
                                        <div style={{ background: '#333', padding: '10px', borderRadius: '5px', textAlign: 'center', marginBottom: '10px' }}>
                                            <span style={{ color: 'white', fontSize: '18px' }}>Заявки</span>
                                        </div>
                                    </Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MenuPage;
