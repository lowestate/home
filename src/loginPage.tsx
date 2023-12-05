import { FC, useEffect, useState } from 'react'
import './styles/hp-style.css'
import { loginUser } from './modules/login';

const LoginPage: FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleLogin = async () => {
        try {
          const data = {
            username: login,
            password: password
          };
          await loginUser(data);
        } catch (error: any) {
          setErrorMessage(error.message as string);
        }
      };

  return (
    <div className="login-card">
      <h2>Авторизация</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="form-group">
        <label htmlFor="login">Логин:</label>
        <input type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Введите логин" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Пароль:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Введите пароль" />
      </div>
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
};  

export default LoginPage