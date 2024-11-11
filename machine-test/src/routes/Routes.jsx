// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../views/dashboard/Dashboard';
import LoginPage from '../views/login/LoginPage';
import CreateEmployee from '../views/employee/CreateEmployee';
import EditEmployee from '../views/employee/EditEmployee';
import EmployeeList from '../views/employee/EmployeeList';

function AppRoutes()  {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/employee-list" element={<EmployeeList/>} />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
        {/* Redirect to dashboard if route not found */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
