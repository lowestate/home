import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner, Modal } from 'react-bootstrap';
import { loginUser, registerUser } from '../modules/auth_actions';
import store, { useAppDispatch } from '../store/store';
import "../styles/auth-style.css"

interface InputChangeInterface {
  target: HTMLInputElement;
}

const AuthPage: FC = () => {
  const { loading, userInfo, success } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.auth
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleRegisterModalClose = () => {
    setShowRegisterModal(false);
  };

  const handleLoginChange = (event: InputChangeInterface) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event: InputChangeInterface) => {
    setPassword(event.target.value);
  };

  const sendLogin = async () => {
    await dispatch(loginUser({ login: login, password: password }));
    window.location.reload()
  };

  const sendRegister = async () => {
    dispatch(registerUser({ login: login, password: password }));
  };

  useEffect(() => {
    if (success) {
      // искусственное обновление страницы
      navigate('/profile', { replace: true, state: { forceRefresh: true } });
    }
  }, [navigate, userInfo, success]);

  return (
    <>
      <Modal show={success && showRegisterModal && !loading} onHide={handleRegisterModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Регистрация прошла успешно!</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRegisterModalClose}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="login-card">
        <h1>Вход</h1>
        <div className="form-group">
          <label>Логин:</label>
          <input className="input-login" value={login} onChange={handleLoginChange} />
        </div>
        <div className="form-group">
          <label>Пароль:</label>
          <input className="input-login" type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button onClick={sendLogin} disabled={loading}>
          Войти
        </button>
        <button onClick={sendRegister} disabled={loading}>
          Регистрация
        </button>
        {loading ? <Spinner animation="border" role="status" /> : ''}
      </div>
    </>
  );
};

export default AuthPage;
