import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import '../App.css';

export default function Beneficiaries() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBeneficiary, setNewBeneficiary] = useState({
    name: '',
    age: '',
    gender: 'Female',
    programme: 'CS&D',
    img: '',
  });
  const [imageError, setImageError] = useState('');

  const [beneficiaries, setBeneficiaries] = useState([
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
  ]);

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'grid' ? 'list' : 'grid'));
  };

  const handleAddBeneficiary = (event) => {
    event.preventDefault();
    setBeneficiaries((previousBeneficiaries) => [
      ...previousBeneficiaries,
      { ...newBeneficiary, id: Date.now(), age: Number(newBeneficiary.age) },
    ]);
    setNewBeneficiary({ name: '', age: '', gender: 'Female', programme: 'CS&D', img: '' });
    setImageError('');
    setIsModalOpen(false);
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

              <button className="view-profile-btn">View Profile</button>
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
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-submit">Add beneficiary</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}