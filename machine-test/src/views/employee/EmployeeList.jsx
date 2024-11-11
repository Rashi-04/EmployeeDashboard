// src/components/EmployeeList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'antd';
import 'antd/dist/reset.css';
import Header from '../header/Header';
import Navbar from '../navbar/Navbar';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Function to fetch employees from the API
  const fetchEmployees = async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/employees${query ? `?search=${query}` : ''}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch employees on component mount and when searchQuery changes
  useEffect(() => {
    fetchEmployees(searchQuery);
  }, [searchQuery]);

  // Handle search input change
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle Create Employee button click
  const handleCreateEmployee = () => {
    navigate('/create-employee'); // Ensure this route is defined in your Routes
  };

  // Handle Delete Employee
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete employee');
        }
        // Remove the deleted employee from the state
        setEmployees(employees.filter((employee) => employee.id !== id));
      } catch (err) {
        alert(err.message);
      }
    }
    fetchEmployees();
  };

  // Handle Edit Employee
  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`); // Ensure this route and component are defined
  };

  const columns = [
    {
      title: 'Unique ID',
      dataIndex: '_id',
      key: '_id',
      sorter: (a, b) => a._id - b._id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Mobile No',
      dataIndex: 'mobile',
      key: 'mobile',
      sorter: (a, b) => a.mobile.localeCompare(b.mobile),
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
      sorter: (a, b) => a.designation.localeCompare(b.designation),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      sorter: (a, b) => a.gender.localeCompare(b.gender),
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      sorter: (a, b) => a.course.localeCompare(b.course),
    },
    {
      title: 'Create Date',
      dataIndex: 'createDate',
      key: 'createDate',
      sorter: (a, b) => new Date(a.createDate) - new Date(b.createDate),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record._id)}>✏️ Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>🗑️ Delete</Button>
        </>
      ),
    },
  ];

  const totalEmployees = employees.length;
  const username = localStorage.getItem('username');

  return (
    <>
      <Header />
      {username && <Navbar username={username} />}
      <header style={headerStyle}>
        <h2 style={titleStyle}>Employee List</h2>
        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={handleSearch}
            style={searchStyle}
          />
          <div className='card'>
            <span style={totalStyle}>Total:{totalEmployees}</span>
          </div>
          &nbsp;
          &nbsp;
          <button style={createEmployeeButtonStyle} onClick={handleCreateEmployee}>
            + Create Employee
          </button>
        </div>
      </header>

      {loading ? (
        <p>Loading employees...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <Table
          className="card"
          columns={columns}
          dataSource={employees}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      )}
    </>
  );
};

// Styles
const containerStyle = {
  padding: '20px',
  maxWidth: '1200px',
  margin: '0 auto',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
};

const titleStyle = {
  fontSize: '24px',
  color: '#333',
  margin: '0',
};

const searchContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const searchStyle = {
  padding: '8px',
  width: '250px',
  marginRight: '10px',
  borderRadius: '4px',
  border: '1px solid #ddd',
};

const totalStyle = {
  marginLeft: '15px',
  fontSize: '16px',
  color: '#333',
};

const createEmployeeButtonStyle = {
  padding: '10px 15px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default EmployeeList;
