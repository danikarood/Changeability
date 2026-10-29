import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import '../App.css';

export default function Volunteers() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVolunteer, setNewVolunteer] = useState({
    name: '',
    age: '',
    gender: 'F',
    programme: 'CS&D',
  });

  const [volunteers, setVolunteers] = useState([
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
  ]);

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'grid' ? 'list' : 'grid'));
  };

  const handleAddVolunteer = (event) => {
    event.preventDefault();
    const programmeFull = newVolunteer.programme === 'CS&D'
      ? 'Community & Skills Development'
      : 'Health & Assistance Programme';
    setVolunteers((previousVolunteers) => [
      ...previousVolunteers,
      { ...newVolunteer, id: Date.now(), age: Number(newVolunteer.age), programmeFull, img: '' },
    ]);
    setNewVolunteer({ name: '', age: '', gender: 'F', programme: 'CS&D' });
    setIsModalOpen(false);
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
            <button className="btn btn-orange" onClick={toggleViewMode}>
              Change view
            </button>
            <button className="btn btn-orange" onClick={() => setIsModalOpen(true)}>+ Add volunteer</button>
          </div>
        </div>

        {/* Dynamic Volunteer Cards Container */}
        <div className={`volunteers-container ${viewMode}-view`}>
          {filteredVolunteers.map((v) => (
            <div key={v.id} className="volunteer-card">
              {v.img
                ? <img src={v.img} alt={v.name} className="avatar" />
                : <span className="avatar avatar-placeholder" aria-hidden="true">
                  {v.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                </span>}

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
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="add-volunteer-title" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h3 id="add-volunteer-title">Add Volunteer</h3>
              <button type="button" className="close-btn" aria-label="Close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form className="modal-form" onSubmit={handleAddVolunteer}>
              <div className="form-group">
                <label htmlFor="volunteer-name">Full name</label>
                <input id="volunteer-name" name="name" value={newVolunteer.name} onChange={(event) => setNewVolunteer({ ...newVolunteer, name: event.target.value })} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="volunteer-age">Age</label>
                  <input id="volunteer-age" name="age" type="number" min="1" max="120" value={newVolunteer.age} onChange={(event) => setNewVolunteer({ ...newVolunteer, age: event.target.value })} required />
                </div>
                <div className="form-group">
                  <label htmlFor="volunteer-gender">Gender</label>
                  <select id="volunteer-gender" name="gender" value={newVolunteer.gender} onChange={(event) => setNewVolunteer({ ...newVolunteer, gender: event.target.value })}>
                    <option value="F">Female</option>
                    <option value="M">Male</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="volunteer-programme">Programme</label>
                <select id="volunteer-programme" name="programme" value={newVolunteer.programme} onChange={(event) => setNewVolunteer({ ...newVolunteer, programme: event.target.value })}>
                  <option value="CS&D">Community &amp; Skills Development</option>
                  <option value="H&AP">Health &amp; Assistance Programme</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-submit">Add volunteer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}