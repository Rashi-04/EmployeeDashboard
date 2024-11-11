// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, TeamOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const Navbar = ({username}) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('username');
    console.log("sssssssssssss");
    navigate('/');
  };
  return (
    <Header className="navbar-header">
      <Menu mode="horizontal" defaultActiveFirst="/dashboard" className="navbar-menu">
        <Menu.Item key="/dashboard" icon={<HomeOutlined />}>
          <Link to="/dashboard">Home</Link>
        </Menu.Item>
        <Menu.Item key="/employee-list" icon={<TeamOutlined />}>
          <Link to="/employee-list">Employee List</Link>
        </Menu.Item>
      </Menu>
      <p>{username} &nbsp; <span onClick={handleLogout} style={{height:"50px", textAlign:"initial", backgroundColor:"crimson", padding:"10px", color:"whitesmoke", cursor:"pointer"}}>Logout</span></p>
      
      
    </Header>
  );
};
export default Navbar;
