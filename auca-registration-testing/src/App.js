import React, { useState } from 'react';
import { User, Mail, Lock, CreditCard, BookOpen, Building2, Phone } from 'lucide-react';
import './App.css';

export default function App() {
  const [formData, setFormData] = useState({
    role: 'Student',
    id: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    studyLevel: '',
    faculty: '',
    department: ''
  });

  const facultyOptions = {
    IT: ['Software Engineering', 'Information Management', 'Networking'],
    Business: ['Accounting', 'Finance', 'Marketing'],
    Education: ['Mathematics Education', 'English Education'],
    Theology: ['Pastoral Theology', 'Church Administration']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'faculty' ? { department: '' } : {})
    }));
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
          {/* Role Selection */}
          <div className="form-group">
            <label className="label">Role *</label>
            <div className="role-buttons">
              {['Student', 'Staff'].map(role => (
                <button
                  key={role}
                  type="button"
                  onClick={() =>
                    setFormData(prev => ({
                      ...prev,
                      role,
                      id: '',
                      faculty: '',
                      department: '',
                      studyLevel: ''
                    }))
                  }
                  className={`role-btn ${formData.role === role ? 'active' : ''}`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* ID */}
          <div className="form-group">
            <label className="label">{formData.role} ID *</label>
            <div className="input-wrapper">
              <CreditCard className="input-icon" size={20} />
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder={formData.role === 'Student' ? '26636' : '32452'}
                className="input"
              />
            </div>
          </div>

          {/* Full Name */}
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
                className="input"
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="label">Email *</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={formData.role === 'Student' ? '@gmail.com' : '@auca.ac.rw'}
                className="input"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label className="label">Phone Number *</label>
            <div className="input-wrapper">
              <Phone className="input-icon" size={20} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 0781234567"
                className="input"
              />
            </div>
          </div>

          {/* Password */}
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
                className="input"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="label">Confirm Password *</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="input"
              />
            </div>
          </div>

          {/* Study Level */}
          {formData.role === 'Student' && (
            <div className="form-group">
              <label className="label">Study Level *</label>
              <div className="input-wrapper">
              <Building2 className="input-icon" size={20} />
              <select
                name="studyLevel"
                value={formData.studyLevel}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select study level</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Masters">Masters</option>
              </select>
              </div>
            </div>
          )}

          {/* Faculty */}
          <div className="form-group">
            <label className="label">Faculty *</label>
            <div className="input-wrapper">
              <Building2 className="input-icon" size={20} />
              <select
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Faculty</option>
                {Object.keys(facultyOptions).map(faculty => (
                  <option key={faculty} value={faculty}>
                    {faculty}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Department */}
          <div className="form-group">
            <label className="label">Department *</label>
            <div className="input-wrapper">
              <BookOpen className="input-icon" size={20} />
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="input"
                disabled={!formData.faculty}
              >
                <option value="">Select Department</option>
                {formData.faculty &&
                  facultyOptions[formData.faculty].map(dep => (
                    <option key={dep} value={dep}>
                      {dep}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button className="submit-btn">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
