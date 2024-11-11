// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <img src="/path-to-your-logo.png" alt="Logo" style={{ height: '40px' }} />
      </div>
    </header>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#f1f1f1',
  borderBottom: '1px solid #ddd',
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
};

const userSectionStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const logoutButtonStyle = {
  backgroundColor: '#ff4d4d',
  color: '#fff',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Header;
