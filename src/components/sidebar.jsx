import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/ChangeAbility-Logo.webp';
import '../App.css';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout cleanup here if needed
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Beneficiaries', path: '/beneficiaries' },
    { name: 'Volunteers', path: '/volunteers' },
    { name: 'Calendar', path: '/calendar' },
  ];

  return (
    <aside className="sidebar-container">
      {/* Brand Logo */}
      <div className="sidebar-logo-container">
        <img src={logo} alt="ChangeAbility Logo" className="sidebar-logo" />
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="active-indicator"></span>
            <span className="link-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Improved Logout Button at Bottom */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout} aria-label="Log out">
          <svg
            className="logout-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span className="logout-text">Logout</span>
        </button>
      </div>
    </aside>
  );
}