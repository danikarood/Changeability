import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import SignUp from './pages/SignUp';
import Login from './pages/LogIn';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root / to signup page */}
        <Route path="/" element={<Navigate to="/signup" replace />} />
        
        {/* Sign Up Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/SignUp" element={<SignUp />} />

        {/* Login Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}