import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoutUser from './modules/logout';

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      await logoutUser();
      navigate('/login');
    };

    handleLogout();
  }, [navigate]);

  return null;
};

export default LogoutPage;
