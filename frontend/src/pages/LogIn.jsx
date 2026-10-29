import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/ChangeAbility-Logo.webp';
import '../LogIn.css';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Submitted:', { ...formData, rememberMe });
    // Navigate to dashboard after login
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      {/* Left Hero Section */}
      <div className="login-left">
        <div className="brand-header">
          <img src={logo} alt="ChangeAbility Logo" className="brand-logo-img" />
        </div>

        <div className="hero-content">
          <h1 className="hero-title">See Differently</h1>
          <p className="hero-subtitle">
            A welcoming place to connect people, care, and possibility.
          </p>
        </div>

        {/* Decorative Background Shapes */}
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

      {/* Right Form Card */}
      <div className="login-right">
        <div className="form-card">
          <span className="form-category">CHANGEABILITY</span>
          <h2 className="form-title">Sign In</h2>
          <p className="form-description">
            Please enter your credentials to access your account.
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Address */}
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
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

            {/* Password */}
            <div className="input-group">
              <label htmlFor="password">Password</label>
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

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember Me</span>
              </label>

              <a href="#forgot-password" className="forgot-password-link">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              Sign In
            </button>
          </form>

          {/* Footer Link */}
          <p className="form-footer">
            Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}