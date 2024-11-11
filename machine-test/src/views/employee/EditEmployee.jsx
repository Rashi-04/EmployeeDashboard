// src/components/EditEmployee.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../header/Header';
import Navbar from '../navbar/Navbar';

const EditEmployee = () => {
  const { id } = useParams(); // Get employee ID from URL
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileError, setMobileError] = useState(null); // State for mobile validation error

  // Fetch employee data by ID
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/employees/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch employee data');
        }
        const data = await response.json();
        setEmployee(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'mobile') {
      // Validate phone number format (10 digits)
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(value)) {
        setMobileError('Phone number must be 10 digits.');
      } else {
        setMobileError(null);
      }
    }

    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mobileError) return; // Prevent submission if mobile validation fails

    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
      if (!response.ok) {
        throw new Error('Failed to update employee');
      }
      alert('Employee updated successfully!');
      navigate('/employee-list');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading employee data...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  const username = localStorage.getItem('username');
  return (
    <>
      <Header />
      {username && <Navbar username={username} />}
      <div style={formContainerStyle}>
        <h2>Edit Employee</h2>
        <form className='card' onSubmit={handleSubmit} style={formStyle}>
          {/* Name */}
          <div style={formGroupStyle}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Email */}
          <div style={formGroupStyle}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Mobile */}
          <div style={formGroupStyle}>
            <label>Mobile No:</label>
            <input
              type="text"
              name="mobile"
              value={employee.mobile}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            {mobileError && <p style={{ color: 'red' }}>{mobileError}</p>}
          </div>

          {/* Designation */}
          <div style={formGroupStyle}>
            <label>Designation:</label>
            <select
              name="designation"
              value={employee.designation}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Select</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          {/* Gender */}
          <div style={formGroupStyle}>
            <label>Gender:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={employee.gender === 'Male'}
                  onChange={handleChange}
                />
                Male
              </label>
              <label style={{ marginLeft: '10px' }}>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={employee.gender === 'Female'}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
          </div>

          {/* Course */}
          <div style={formGroupStyle}>
            <label>Course:</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="MCA"
                  checked={employee.course.includes('MCA')}
                  onChange={(e) => {
                    const { value, checked } = e.target;
                    if (checked) {
                      setEmployee((prev) => ({
                        ...prev,
                        course: prev.course.includes(value)
                          ? prev.course
                          : prev.course + (prev.course ? ', ' : '') + value,
                      }));
                    } else {
                      setEmployee((prev) => ({
                        ...prev,
                        course: prev.course
                          .split(', ')
                          .filter((c) => c !== value)
                          .join(', '),
                      }));
                    }
                  }}
                />
                MCA
              </label>
              <label style={{ marginLeft: '10px' }}>
                <input
                  type="checkbox"
                  name="course"
                  value="BCA"
                  checked={employee.course.includes('BCA')}
                  onChange={(e) => {
                    const { value, checked } = e.target;
                    if (checked) {
                      setEmployee((prev) => ({
                        ...prev,
                        course: prev.course.includes(value)
                          ? prev.course
                          : prev.course + (prev.course ? ', ' : '') + value,
                      }));
                    } else {
                      setEmployee((prev) => ({
                        ...prev,
                        course: prev.course
                          .split(', ')
                          .filter((c) => c !== value)
                          .join(', '),
                      }));
                    }
                  }}
                />
                BCA
              </label>
              <label style={{ marginLeft: '10px' }}>
                <input
                  type="checkbox"
                  name="course"
                  value="BSC"
                  checked={employee.course.includes('BSC')}
                  onChange={(e) => {
                    const { value, checked } = e.target;
                    if (checked) {
                      setEmployee((prev) => ({
                        ...prev,
                        course: prev.course.includes(value)
                          ? prev.course
                          : prev.course + (prev.course ? ', ' : '') + value,
                      }));
                    } else {
                      setEmployee((prev) => ({
                        ...prev,
                        course: prev.course
                          .split(', ')
                          .filter((c) => c !== value)
                          .join(', '),
                      }));
                    }
                  }}
                />
                BSC
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" style={submitButtonStyle}>
            Update Employee
          </button>
        </form>
      </div>
    </>
  );
};

// Styles
const formContainerStyle = {
  padding: '20px',
  maxWidth: '600px',
  margin: '0 auto',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const formGroupStyle = {
  marginBottom: '15px',
};

const inputStyle = {
  padding: '8px',
  width: '100%',
  borderRadius: '4px',
  border: '1px solid #ddd',
};

const submitButtonStyle = {
  padding: '10px 15px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default EditEmployee;
