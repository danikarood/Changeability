import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/ChangeAbility-Logo.webp';
import '../SignUp.css';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="signup-container">
      {/* Left Branding Hero Section */}
      <div className="signup-left">
        <div className="brand-header">
          <img src={logo} alt="ChangeAbility Logo" className="brand-logo-img" />
        </div>

        <div className="hero-content">
          <h1 className="hero-title">See Differently</h1>
          <p className="hero-subtitle">
            A welcoming place to connect people, care, and possibility.
          </p>
        </div>

        {/* Decorative Shapes Layer */}
        <div className="decorative-graphics">
          <div className="shape-red-corner"></div>
          <div className="shape-orange-outline"></div>
          <div className="circle-group">
            <span className="circle-outline"></span>
            <span className="circle-outline"></span>
            <span className="circle-outline"></span>
          </div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="signup-right">
        <div className="form-card">
          <span className="form-category">CHANGEABILITY</span>
          <h2 className="form-title">Create Your Account</h2>
          <p className="form-description">
            Join ChangeAbility to help coordinate meaningful care and support.
          </p>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-group">
              <label htmlFor="fullName">FULL NAME</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@changeability.org"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">PASSWORD</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="example@123"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="eye-icon-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                    {!showPassword && <path d="M3 3l18 18"></path>}
                  </svg>
                </button>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="example@123"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="eye-icon-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  aria-pressed={showConfirmPassword}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                    {!showConfirmPassword && <path d="M3 3l18 18"></path>}
                  </svg>
                </button>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              CREATE ACCOUNT
            </button>
          </form>

          <p className="form-footer">
            Already have an account? <Link to="/login" className="signin-link">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}