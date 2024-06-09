import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleUserNavigation = () => {
    window.location.href = '/user';
  };

  return (
    <header style={{ border: '1px solid #333', height: '40px', position: 'fixed', width: '100%', backgroundColor: '#fff' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Link to="/testID/testUUID">Главная</Link>
        <span onClick={() => navigate('/info', { state: { tel: '8800-35-35' } })} style={{ cursor: 'pointer' }}>
          Инфо
        </span>
        <span onClick={handleUserNavigation} style={{ cursor: 'pointer' }}>
          Пользователь
        </span>
      </nav>
    </header>
  );
};

export default Header;
