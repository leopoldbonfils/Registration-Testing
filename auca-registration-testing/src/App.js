import React, { useState } from 'react';
import { User, Mail, Lock, CreditCard } from 'lucide-react';
import './App.css';

export default function App() {
  const [formData, setFormData] = useState({
    role: 'Student',
    id: '',
    fullName: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.id) {
      newErrors.id = 'ID is required';
    } else if (formData.role === 'Student' && !formData.id.match(/^AUC\d{4}-\d{4}$/)) {
      newErrors.id = 'Student ID format: 26636';
    } else if (formData.role === 'Staff' && !formData.id.match(/^STF-\d{3}$/)) {
      newErrors.id = 'Staff ID format: 23452';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    }else if (formData.role === 'Student' && !formData.email.match(/^[^\s@]+@(gmail\.com|yahoo\.com|outlook\.com)$/)) {
      newErrors.email = 'Email must be(@gmail.com , @yahoo.com, @outlook.com)';
    } else if (formData.role === 'Staff' && !formData.email.match(/^[^\s@]+@auca\.ac\.rw$/)) {
      newErrors.email = 'Email must be a valid AUCA email (@auca.ac.rw)';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 2) {
      newErrors.password = 'Password must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert(`Registration successful!\n\nRole: ${formData.role}\nID: ${formData.id}\nName: ${formData.fullName}\nEmail: ${formData.email}`);
      setFormData({
        role: 'Student',
        id: '',
        fullName: '',
        email: '',
        password: ''
      });
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header">
         
          <h1 className="title">AUCA Registration</h1>
          <p className="subtitle">Welcome to the AUCA Registration Portal</p>
          <p className="description">Please select your role and fill in your information</p>
        </div>

        <div className="form">
          <div className="form-group">
            <label className="label">Role *</label>
            <div className="role-buttons">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'Student', id: '' }))}
                className={`role-btn ${formData.role === 'Student' ? 'active' : ''}`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'Staff', id: '' }))}
                className={`role-btn ${formData.role === 'Staff' ? 'active' : ''}`}
              >
                Staff
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="label">
              {formData.role === 'Student' ? 'Student ID' : 'Staff ID'} *
            </label>
            <div className="input-wrapper">
              <CreditCard className="input-icon" size={20} />
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder={formData.role === 'Student' ? '26636' : '32452'}
                className={`input ${errors.id ? 'error' : ''}`}
              />
            </div>
            {errors.id && <p className="error-text">{errors.id}</p>}
          </div>

          <div className="form-group">
            <label className="label">Full Name *</label>
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Leopold Mugisha"
                className={`input ${errors.fullName ? 'error' : ''}`}
              />
            </div>
            {errors.fullName && <p className="error-text">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label className="label">AUCA Email *</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={formData.role === 'Student' ? '@gmail.com , @yahoo.com, @outlook.com' : '@auca.ac.rw'}
                className={`input ${errors.email ? 'error' : ''}`}
              />
            </div>
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="label">Password *</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a secure password"
                className={`input ${errors.password ? 'error' : ''}`}
              />
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <button onClick={handleSubmit} className="submit-btn">
            Register
          </button>
        </div>

        
      </div>
    </div>
  );
}