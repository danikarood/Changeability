import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import API, { getApiError } from '../utils/api';
import '../App.css';

export default function Beneficiaries() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBeneficiary, setNewBeneficiary] = useState({
    name: '',
    age: '',
    gender: 'Female',
    programme: 'CS&D',
    img: '',
    email: '',
    phone: '',
    address: '',
  });
  const [imageError, setImageError] = useState('');
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState([]);

  useEffect(() => {
    let active = true;
    API.get('/entities/beneficiary')
      .then(({ data }) => {
        if (active) setBeneficiaries(data);
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

  const handleAddBeneficiary = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setApiError('');
    try {
      const { data } = await API.post('/entities', {
        ...newBeneficiary,
        age: Number(newBeneficiary.age),
        type: 'beneficiary',
      });
      setBeneficiaries((previousBeneficiaries) => [...previousBeneficiaries, data]);
      setNewBeneficiary({
        name: '',
        age: '',
        gender: 'Female',
        programme: 'CS&D',
        img: '',
        email: '',
        phone: '',
        address: '',
      });
      setImageError('');
      setIsModalOpen(false);
    } catch (error) {
      setApiError(getApiError(error));
    } finally {
      setIsSaving(false);
    }
  };

  const handleBeneficiaryImageChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      setNewBeneficiary((previousBeneficiary) => ({ ...previousBeneficiary, img: '' }));
      setImageError('');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setImageError('Please select an image file.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        setImageError('The selected image could not be loaded.');
        return;
      }
      setNewBeneficiary((previousBeneficiary) => ({ ...previousBeneficiary, img: reader.result }));
      setImageError('');
    };
    reader.onerror = () => setImageError('The selected image could not be loaded.');
    reader.readAsDataURL(file);
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
            <button className="btn btn-orange" onClick={toggleViewMode}>
              Change view
            </button>
            <button className="btn btn-orange" onClick={() => setIsModalOpen(true)}>+ Add beneficiary</button>
          </div>
        </div>

        {apiError && <p className="image-upload-error" role="alert">{apiError}</p>}
        {isLoading && <p role="status">Loading beneficiaries...</p>}

        {/* Dynamic Display Area (Grid vs List) */}
        <div className={`beneficiaries-container ${viewMode}-view`}>
          {filteredBeneficiaries.map((b) => (
            <div key={b.id} className="beneficiary-card">
              {b.img
                ? <img src={b.img} alt={b.name} className="avatar" />
                : <span className="avatar avatar-placeholder" aria-hidden="true">
                  {b.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                </span>}

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

              <button
                className="view-profile-btn"
                onClick={() => navigate('/profile', { state: { profile: b } })}
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </main>
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="add-beneficiary-title" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h3 id="add-beneficiary-title">Add Beneficiary</h3>
              <button type="button" className="close-btn" aria-label="Close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form className="modal-form" onSubmit={handleAddBeneficiary}>
              <div className="form-group">
                <label htmlFor="beneficiary-name">Full name</label>
                <input id="beneficiary-name" name="name" value={newBeneficiary.name} onChange={(event) => setNewBeneficiary({ ...newBeneficiary, name: event.target.value })} required />
              </div>
              <div className="form-group">
                <label htmlFor="beneficiary-image">Photo</label>
                <input id="beneficiary-image" name="image" type="file" accept="image/*" onChange={handleBeneficiaryImageChange} />
                {newBeneficiary.img && <img src={newBeneficiary.img} alt="Beneficiary preview" className="image-upload-preview" />}
                {imageError && <span className="image-upload-error" role="alert">{imageError}</span>}
                {apiError && <span className="image-upload-error" role="alert">{apiError}</span>}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="beneficiary-age">Age</label>
                  <input id="beneficiary-age" name="age" type="number" min="1" max="120" value={newBeneficiary.age} onChange={(event) => setNewBeneficiary({ ...newBeneficiary, age: event.target.value })} required />
                </div>
                <div className="form-group">
                  <label htmlFor="beneficiary-gender">Gender</label>
                  <select id="beneficiary-gender" name="gender" value={newBeneficiary.gender} onChange={(event) => setNewBeneficiary({ ...newBeneficiary, gender: event.target.value })}>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="beneficiary-programme">Programme</label>
                <select id="beneficiary-programme" name="programme" value={newBeneficiary.programme} onChange={(event) => setNewBeneficiary({ ...newBeneficiary, programme: event.target.value })}>
                  <option value="CS&D">Community &amp; Skills Development</option>
                  <option value="H&AP">Health &amp; Assistance Programme</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="beneficiary-email">Email address</label>
                <input id="beneficiary-email" name="email" type="email" value={newBeneficiary.email} onChange={(event) => setNewBeneficiary({ ...newBeneficiary, email: event.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="beneficiary-phone">Phone number</label>
                  <input id="beneficiary-phone" name="phone" type="tel" value={newBeneficiary.phone} onChange={(event) => setNewBeneficiary({ ...newBeneficiary, phone: event.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="beneficiary-address">Address</label>
                  <input id="beneficiary-address" name="address" value={newBeneficiary.address} onChange={(event) => setNewBeneficiary({ ...newBeneficiary, address: event.target.value })} />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Add beneficiary'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}