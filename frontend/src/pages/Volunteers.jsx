import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import API, { getApiError } from '../utils/api';
import '../App.css';

export default function Volunteers() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVolunteer, setNewVolunteer] = useState({
    name: '',
    age: '',
    gender: 'F',
    programme: 'CS&D',
    email: '',
    phone: '',
    address: '',
    img: '',
  });
  const [volunteers, setVolunteers] = useState([]);
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let active = true;
    API.get('/entities/volunteer')
      .then(({ data }) => {
        if (active) setVolunteers(data);
      })
      .catch((error) => {
        if (active) setApiError(getApiError(error));
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'grid' ? 'list' : 'grid'));
  };

  const handleAddVolunteer = async (event) => {
    event.preventDefault();
    const programmeFull = newVolunteer.programme === 'CS&D'
      ? 'Community & Skills Development'
      : 'Health & Assistance Programme';
    setIsSaving(true);
    setApiError('');
    try {
      const { data } = await API.post('/entities', {
        ...newVolunteer,
        age: Number(newVolunteer.age),
        programmeFull,
        type: 'volunteer',
      });
      setVolunteers((previousVolunteers) => [...previousVolunteers, data]);
      setNewVolunteer({
        name: '',
        age: '',
        gender: 'F',
        programme: 'CS&D',
        email: '',
        phone: '',
        address: '',
        img: '',
      });
      setIsModalOpen(false);
    } catch (error) {
      setApiError(getApiError(error));
    } finally {
      setIsSaving(false);
    }
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

        {apiError && <p className="image-upload-error" role="alert">{apiError}</p>}
        {isLoading && <p role="status">Loading volunteers...</p>}

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

              <button
                className="view-profile-btn"
                onClick={() => navigate('/profile', { state: { profile: v } })}
              >
                View Profile
              </button>
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
              <div className="form-group">
                <label htmlFor="volunteer-image">Photo URL</label>
                <input id="volunteer-image" name="img" type="url" value={newVolunteer.img} onChange={(event) => setNewVolunteer({ ...newVolunteer, img: event.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="volunteer-email">Email address</label>
                <input id="volunteer-email" name="email" type="email" value={newVolunteer.email} onChange={(event) => setNewVolunteer({ ...newVolunteer, email: event.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="volunteer-phone">Phone number</label>
                  <input id="volunteer-phone" name="phone" type="tel" value={newVolunteer.phone} onChange={(event) => setNewVolunteer({ ...newVolunteer, phone: event.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="volunteer-address">Address</label>
                  <input id="volunteer-address" name="address" value={newVolunteer.address} onChange={(event) => setNewVolunteer({ ...newVolunteer, address: event.target.value })} />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Add volunteer'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}