import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import './ProfileView.css';

const profileFallback = {
  name: 'Ayanda Nkosi',
  age: 29,
  gender: 'Female',
  programme: 'Health & Assistive Programs (H&AP)',
  img: 'https://i.pravatar.cc/150?img=49',
  email: 'ayanda.nkosi@changeability.org',
  phone: '+27 82 555 1234',
  address: '14 Hope Street, Johannesburg',
  status: 'Active',
};

const programmeNames = {
  'CS&D': 'Community & Skills Development',
  'H&AP': 'Health & Assistive Programs (H&AP)',
};

export default function ProfileView() {
  const location = useLocation();
  const navigate = useNavigate();
  const profile = location.state?.profile || profileFallback;
  const fullName = profile.name || profileFallback.name;
  const emailName = fullName.toLowerCase().trim().replace(/\s+/g, '.');
  const gender = profile.gender === 'F'
    ? 'Female'
    : profile.gender === 'M'
      ? 'Male'
      : profile.gender || 'Not provided';
  const programme = programmeNames[profile.programme]
    || profile.programmeFull
    || profile.programme
    || profileFallback.programme;

  return (
    <div className="page-layout profile-page-layout">
      <Sidebar />

      <main className="main-content profile-main-content">
        <button className="back-btn" onClick={() => navigate(-1)}>
          &larr; Back
        </button>

        <div className="profile-card-container">
          <div className="profile-header-banner">
            {profile.img
              ? <img src={profile.img} alt={fullName} className="profile-avatar-large" />
              : <span className="profile-avatar-large profile-avatar-placeholder" aria-hidden="true">
                {fullName.split(' ').map((part) => part[0]).slice(0, 2).join('')}
              </span>}
            <div className="profile-title-area">
              <span className="profile-category">CHANGEABILITY PROFILE</span>
              <h1 className="profile-name">{fullName}</h1>
              <span className="profile-status-badge">{profile.status || 'Active'}</span>
            </div>
          </div>

          <div className="profile-details-grid">
            <div className="detail-group">
              <span className="detail-label">AGE</span>
              <span className="detail-value">{profile.age ?? 'Not provided'}</span>
            </div>

            <div className="detail-group">
              <span className="detail-label">GENDER</span>
              <span className="detail-value">{gender}</span>
            </div>

            <div className="detail-group">
              <span className="detail-label">PROGRAMME</span>
              <span className="detail-value highlight">{programme}</span>
            </div>

            <div className="detail-group">
              <span className="detail-label">EMAIL ADDRESS</span>
              <span className="detail-value">{profile.email || `${emailName}@changeability.org`}</span>
            </div>

            <div className="detail-group">
              <span className="detail-label">PHONE NUMBER</span>
              <span className="detail-value">{profile.phone || '+27 83 456 7890'}</span>
            </div>

            <div className="detail-group">
              <span className="detail-label">LOCATION</span>
              <span className="detail-value">{profile.address || 'Gauteng, South Africa'}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
