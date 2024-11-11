import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import EmployeeList from '../employee/EmployeeList';
import Navbar from '../navbar/Navbar';

function Dashboard() {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  

  return (
    <>
    <Header/>
    {username && < Navbar username={username}/>}
      <div className='card' style={{ padding: '20px' }}>
        <h2>Dashboard</h2>
        <p>Welcome, {username || 'User'}!</p>
        
      </div>
    </>

  );
}

export default Dashboard
