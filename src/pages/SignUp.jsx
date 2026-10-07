import React, { useState } from 'react';
import '../App.css';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="brand-header">
          <div className="brand-logo-icon" aria-hidden="true">
            <svg viewBox="0 0 100 100" width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 50 A30 30 0 0 1 80 50" stroke="#E8642F" strokeWidth="8" strokeLinecap="round" />
              <path d="M30 50 A20 20 0 0 1 70 50" stroke="#E8642F" strokeWidth="8" strokeLinecap="round" />
              <path d="M40 50 A10 10 0 0 1 60 50" stroke="#E8642F" strokeWidth="8" strokeLinecap="round" />
              <circle cx="15" cy="30" r="3" fill="#E8642F" />
              <circle cx="12" cy="42" r="3" fill="#E8642F" />
              <circle cx="15" cy="54" r="3" fill="#E8642F" />
            </svg>
          </div>
          <span className="brand-name">CHANGEABILITY</span>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">SEE DIFFERENTLY</h1>
          <p className="hero-subtitle">
            A welcoming place to connect people, care, and possibility.
          </p>
        </div>

        <div className="decorative-graphics" aria-hidden="true">
          <div className="shape-red-corner" />
          <div className="shape-orange-outline" />
          <div className="circle-group">
            <span className="circle-outline" />
            <span className="circle-outline" />
            <span className="circle-outline" />
          </div>
        </div>
      </div>

      <div className="signup-right">
        <div className="form-card">
          <span className="form-category">CHANGEABILITY</span>
          <h2 className="form-title">Create your account</h2>
          <p className="form-description">
            Join Changeability to help coordinate meaningful care and support.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label htmlFor="fullName">Full name</label>
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
            <label htmlFor="email">Email address</label>
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
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="eye-icon-btn"
                onClick={() => setShowPassword((current) => !current)}
                aria-label="Toggle password visibility"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="#777" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="eye-icon-btn"
                onClick={() => setShowConfirmPassword((current) => !current)}
                aria-label="Toggle confirm password visibility"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="#777" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>

          <button type="submit" className="signup-btn">Create account</button>

          <p className="form-footer">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
}
