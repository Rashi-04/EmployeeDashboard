import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'hukum gupta' && password === 'admin') {
      localStorage.setItem('username', username);
      navigate('/dashboard');
    } else {
      alert('Invalid login details');
    }
  };

  return (
    <>
      <Header/>
      <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
        <h2>Login Page</h2>
        <div className='card'>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button onClick={handleLogin} style={{ marginTop: '10px' }}>Login</button>
        </div>
      </div>
    </>

  );
}

export default LoginPage
