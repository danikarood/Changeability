import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import '../App.css';

export default function Volunteers() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');

  const volunteers = [
    { id: 1, name: 'Marlene Fourie', age: 41, gender: 'F', programme: 'CS&D', programmeFull: 'Community & Skills Development', img: 'https://i.pravatar.cc/150?img=47' },
    { id: 2, name: 'Gawie Cloete', age: 38, gender: 'M', programme: 'H&AP', programmeFull: 'Community & Skills Development', img: 'https://i.pravatar.cc/150?img=12' },
    { id: 3, name: 'Rajesh Pillay', age: 28, gender: 'M', programme: 'CS&D', programmeFull: 'Community & Skills Development', img: 'https://i.pravatar.cc/150?img=11' },
    { id: 4, name: 'Anele Pillay', age: 32, gender: 'F', programme: 'CS&D', programmeFull: 'Community & Skills Development', img: 'https://i.pravatar.cc/150?img=32' },
    { id: 5, name: 'Vikash Govender', age: 31, gender: 'M', programme: 'H&AP', programmeFull: 'Community & Skills Development', img: 'https://i.pravatar.cc/150?img=68' },
    { id: 6, name: 'Byron Julies', age: 19, gender: 'M', programme: 'CS&D', programmeFull: 'Community & Skills Development', img: 'https://i.pravatar.cc/150?img=13' },
    { id: 7, name: 'Dipak Patel', age: 23, gender: 'M', programme: 'CS&D', programmeFull: 'Community & Skills Development', img: 'https://i.pravatar.cc/150?img=15' },
    { id: 8, name: 'Mandla Zwane', age: 35, gender: 'M', programme: 'CS&D', programmeFull: 'Community & Skills Development', img: 'https://i.pravatar.cc/150?img=53' },
    { id: 9, name: 'Robin de Bruyn', age: 21, gender: 'F', programme: 'CS&D', programmeFull: 'Community & Skills Development', img: 'https://i.pravatar.cc/150?img=28' },
    { id: 10, name: 'Chad Johnstone', age: 28, gender: 'M', programme: 'CS&D', programmeFull: 'Community & Skills Development', img: 'https://i.pravatar.cc/150?img=33' },
    { id: 11, name: 'Nadia Petersen', age: 30, gender: 'F', programme: 'H&AP', programmeFull: 'Community & Skills Development', img: 'https://i.pravatar.cc/150?img=20' },
    { id: 12, name: 'Bongani Ntuli', age: 28, gender: 'M', programme: 'CS&D', programmeFull: 'Community & Skills Development', img: 'https://i.pravatar.cc/150?img=59' },
    { id: 13, name: 'Warren Adams', age: 41, gender: 'M', programme: 'CS&D', programmeFull: 'Community & Skills Development', img: 'https://i.pravatar.cc/150?img=60' },
    { id: 14, name: 'Palesa Maloi', age: 27, gender: 'F', programme: 'CS&D', programmeFull: 'Community & Skills Development', img: 'https://i.pravatar.cc/150?img=49' },
    { id: 15, name: 'Wesley Daniels', age: 17, gender: 'M', programme: 'CS&D', programmeFull: 'Community & Skills Development', img: 'https://i.pravatar.cc/150?img=65' },
    { id: 16, name: 'Pieter Coetzee', age: 29, gender: 'M', programme: 'CS&D', programmeFull: 'Community & Skills Development', img: 'https://i.pravatar.cc/150?img=57' },
    { id: 17, name: 'Charnelle Booysen', age: 18, gender: 'F', programme: 'CS&D', programmeFull: 'Community & Skills Development', img: 'https://i.pravatar.cc/150?img=24' },
    { id: 18, name: 'Elizabeth Barnard', age: 37, gender: 'F', programme: 'CS&D', programmeFull: 'Community & Skills Development', img: 'https://i.pravatar.cc/150?img=29' },
  ];

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'grid' ? 'list' : 'grid'));
  };

  const filteredVolunteers = volunteers.filter((v) =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase())
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
              placeholder="Search Volunteers"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="action-buttons">
            <button className="btn btn-secondary">Select</button>
            <button className="btn btn-orange" onClick={toggleViewMode}>
              Change view
            </button>
            <button className="btn btn-orange">+ Add volunteer</button>
          </div>
        </div>

        {/* Dynamic Volunteer Cards Container */}
        <div className={`volunteers-container ${viewMode}-view`}>
          {filteredVolunteers.map((v) => (
            <div key={v.id} className="volunteer-card">
              <img src={v.img} alt={v.name} className="avatar" />

              <div className="card-info">
                <div className="name-wrapper">
                  <span className="field-label">NAME</span>
                  <h3 className="volunteer-name">{v.name}</h3>
                </div>

                <div className="meta-row age-row">
                  <span className="meta-label">Age</span>
                  <span className="meta-value">{v.age}</span>
                </div>

                <div className="meta-row gender-row">
                  <span className="meta-label">Gender</span>
                  <span className="meta-value">{v.gender === 'F' ? 'Female' : 'Male'}</span>
                </div>

                <div className="meta-row programme-row">
                  <span className="meta-label">PROGRAMME</span>
                  <span className="meta-value programme-text">
                    {viewMode === 'grid' ? v.programmeFull : v.programme}
                  </span>
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