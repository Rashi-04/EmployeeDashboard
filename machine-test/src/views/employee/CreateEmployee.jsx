import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import Navbar from '../navbar/Navbar';

const CreateEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
  });
  const [error, setError] = useState(null);
  const [phoneError, setPhoneError] = useState(''); // State for phone number error
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'mobile') {
      // Phone number validation: 10 digits only
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(value)) {
        setPhoneError('Mobile number must be a 10-digit number.');
      } else {
        setPhoneError(''); // Clear error if valid
      }
    }

    if (type === 'checkbox') {
      setEmployee((prev) => ({
        ...prev,
        course: checked
          ? prev.course.includes(value)
            ? prev.course
            : prev.course + (prev.course ? ', ' : '') + value
          : prev.course
              .split(', ')
              .filter((c) => c !== value)
              .join(', '),
      }));
    } else {
      setEmployee((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent submission if there's a phone error
    if (phoneError) {
      alert('Please fix the phone number error before submitting.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
      });
      if (!response.ok) {
        throw new Error('Failed to create employee');
      }
      alert('Employee created successfully!');
      navigate('/employee-list');
    } catch (err) {
      setError(err.message);
    }
  };

  const username = localStorage.getItem('username');

  return (
    <>
      <Header />
      {username && <Navbar username={username} />}
      <div style={formContainerStyle}>
        <h2>Create Employee</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
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
            {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}
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
                  onChange={handleChange}
                />
                MCA
              </label>
              <label style={{ marginLeft: '10px' }}>
                <input
                  type="checkbox"
                  name="course"
                  value="BCA"
                  checked={employee.course.includes('BCA')}
                  onChange={handleChange}
                />
                BCA
              </label>
              <label style={{ marginLeft: '10px' }}>
                <input
                  type="checkbox"
                  name="course"
                  value="BSC"
                  checked={employee.course.includes('BSC')}
                  onChange={handleChange}
                />
                BSC
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" style={submitButtonStyle}>
            Create Employee
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

export default CreateEmployee;
