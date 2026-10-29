import React, { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/ChangeAbility-Logo.webp';
import API, { getApiError } from '../utils/api';
import '../LogIn.css';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const passwordInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handlePasswordToggle = () => {
    const input = passwordInputRef.current;
    const start = input && document.activeElement === input
      ? input.selectionStart ?? input.value.length
      : input?.value.length ?? 0;
    const end = input && document.activeElement === input
      ? input.selectionEnd ?? start
      : start;

    setShowPassword((isVisible) => !isVisible);

    requestAnimationFrame(() => {
      if (!input) return;
      input.focus();
      input.setSelectionRange(start, end);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = new FormData(e.currentTarget).get('password');
    if (typeof password !== 'string') {
      setError('Please enter your password.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      const { data } = await API.post('/auth/login', {
        ...formData,
        password,
      });
      localStorage.removeItem('changeabilityToken');
      sessionStorage.removeItem('changeabilityToken');
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('changeabilityToken', data.token);
      navigate('/dashboard');
    } catch (requestError) {
      setError(getApiError(requestError));
    } finally {
      setIsSubmitting(false);
    }
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
          {location.state?.message && <p className="api-error" role="status">{location.state.message}</p>}
          {error && <p className="api-error" role="alert">{error}</p>}

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
                  ref={passwordInputRef}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="example@123"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="eye-icon-btn"
                  onClick={handlePasswordToggle}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    const input = passwordInputRef.current;
                    if (input && document.activeElement !== input) {
                      input.focus();
                      input.setSelectionRange(input.value.length, input.value.length);
                    }
                  }}
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
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign In'}
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