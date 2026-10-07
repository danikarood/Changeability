import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import '../App.css';

export default function Beneficiaries() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');

  const beneficiaries = [
    { id: 1, name: 'Ayanda Nkosi', age: 29, gender: 'Female', programme: 'H&AP', img: 'https://i.pravatar.cc/150?img=49' },
    { id: 2, name: 'Byron Julies', age: 19, gender: 'Male', programme: 'CS&D', img: 'https://i.pravatar.cc/150?img=11' },
    { id: 3, name: 'Chad Johnstone', age: 28, gender: 'Male', programme: 'CS&D', img: 'https://i.pravatar.cc/150?img=13' },
    { id: 4, name: 'Charlene Fortuin', age: 46, gender: 'Female', programme: 'H&AP', img: 'https://i.pravatar.cc/150?img=47' },
    { id: 5, name: 'Daniel Meyer', age: 26, gender: 'Male', programme: 'CS&D', img: 'https://i.pravatar.cc/150?img=15' },
    { id: 6, name: 'Dipak Patel', age: 23, gender: 'Male', programme: 'CS&D', img: 'https://i.pravatar.cc/150?img=12' },
    { id: 7, name: 'Grace Chen', age: 48, gender: 'Female', programme: 'CS&D', img: 'https://i.pravatar.cc/150?img=45' },
    { id: 8, name: 'Janse Ndlovu', age: 41, gender: 'Male', programme: 'CS&D', img: 'https://i.pravatar.cc/150?img=68' },
    { id: 9, name: 'Johan Steyn', age: 52, gender: 'Male', programme: 'CS&D', img: 'https://i.pravatar.cc/150?img=33' },
    { id: 10, name: 'Johan van Heerden', age: 64, gender: 'Male', programme: 'CS&D', img: 'https://i.pravatar.cc/150?img=59' },
    { id: 11, name: 'Lerato Mofele', age: 31, gender: 'Female', programme: 'H&AP', img: 'https://i.pravatar.cc/150?img=32' },
    { id: 12, name: 'Mandla Zwane', age: 35, gender: 'Male', programme: 'CS&D', img: 'https://i.pravatar.cc/150?img=53' },
    { id: 13, name: 'Nadie Petersen', age: 30, gender: 'Female', programme: 'H&AP', img: 'https://i.pravatar.cc/150?img=20' },
    { id: 14, name: 'Nokuthula Dlamini', age: 39, gender: 'Female', programme: 'H&AP', img: 'https://i.pravatar.cc/150?img=26' },
    { id: 15, name: 'Priya Naidoo', age: 34, gender: 'Female', programme: 'CS&D', img: 'https://i.pravatar.cc/150?img=24' },
    { id: 16, name: 'Robin de Bruyn', age: 21, gender: 'Female', programme: 'CS&D', img: 'https://i.pravatar.cc/150?img=28' },
    { id: 17, name: 'Thandeka Mthembu', age: 27, gender: 'Female', programme: 'H&AP', img: 'https://i.pravatar.cc/150?img=29' },
    { id: 18, name: 'Zanele Khumalo', age: 36, gender: 'Female', programme: 'H&AP', img: 'https://i.pravatar.cc/150?img=44' },
  ];

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'grid' ? 'list' : 'grid'));
  };

  const filteredBeneficiaries = beneficiaries.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-layout">
      <Sidebar />

      <main className="main-content">
        {/* Top Control Header */}
        <div className="top-action-bar">
          <div className="search-input-wrapper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="action-buttons">
            <button className="btn btn-secondary">Select</button>
            <button className="btn btn-orange" onClick={toggleViewMode}>
              Change view
            </button>
            <button className="btn btn-orange">+ Add beneficiary</button>
          </div>
        </div>

       
        {/* Dynamic Display Area (Grid vs List) */}
        <div className={`beneficiaries-container ${viewMode}-view`}>
          {filteredBeneficiaries.map((b) => (
            <div key={b.id} className="beneficiary-card">
              <img src={b.img} alt={b.name} className="avatar" />

              <div className="card-details">
                <span className="field-label">NAME</span>
                <h3 className="beneficiary-name">{b.name}</h3>

                <div className="meta-grid">
                  <div className="meta-item">
                    <span className="meta-label">AGE</span>
                    <span className="meta-value">{b.age}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">GENDER</span>
                    <span className="meta-value">{b.gender}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">PROGRAMME</span>
                    <span className="meta-value highlight">{b.programme}</span>
                  </div>
                </div>
              </div>

              <button className="view-profile-btn">View Profile</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}