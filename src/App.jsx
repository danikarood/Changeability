import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import SignUp from './pages/SignUp';
import Login from './pages/LogIn';
import Dashboard from './pages/Dashboard';
import Beneficiaries from './pages/Beneficiaries';
import Volunteers from './pages/Volunteers';
import CalendarPage from './pages/Calendar';
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Authentication */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/LogIn" element={<Login />} />

        {/* Main Application Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/beneficiaries" element={<Beneficiaries />} />
        <Route path="/Beneficiaries" element={<Beneficiaries />} />
        <Route path="/volunteers" element={<Volunteers />} />
        <Route path="/Volunteers" element={<Volunteers />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/Calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
}