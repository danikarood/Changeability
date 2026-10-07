import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import '../App.css';

export default function Dashboard() {
  const beneficiaries = [
    { name: 'Charlene Fortuin', img: 'https://i.pravatar.cc/100?img=47' },
    { name: 'Johan Steyn', img: 'https://i.pravatar.cc/100?img=12' },
    { name: 'Nokuthula Dlamini', img: 'https://i.pravatar.cc/100?img=32' },
  ];

  const calendarEvents = [
    { title: 'Awareness Workshop', time: '10:00', date: '7/1/27' },
    { title: 'Beneficiary Assessments', time: '10:00', date: '11/1/27' },
    { title: 'Community Participationprogramme', time: '10:00', date: '19/1/27' },
    { title: 'Volunteer orientation', time: '10:00', date: '28/1/27' },
  ];

  const disabilityData = [
    { type: 'Physical', count: 12, color: '#C85A28' },
    { type: 'Intellectual', count: 18, color: '#E8642F' },
    { type: 'Visual', count: 3, color: '#F09D67' },
    { type: 'Hearing', count: 22, color: '#A0421B' },
    { type: 'Developmental', count: 12, color: '#EFA76A' },
    { type: 'Neurological', count: 22, color: '#783012' },
    { type: 'Other', count: 3, color: '#B0A89A' },
  ];

  const dietaryData = [
    { label: 'None', val: 12, color: '#C85A28', percent: '100%' },
    { label: 'Vegetarian', val: 8, color: '#E8642F', percent: '66%' },
    { label: 'Halal', val: 7, color: '#F09D67', percent: '58%' },
    { label: 'Allergies', val: 5, color: '#D4613A', percent: '42%' },
    { label: 'Other', val: 4, color: '#B0A89A', percent: '33%' },
  ];

  const ageGenderData = [
    { group: '0-12', male: 4, female: 2 },
    { group: '13-17', male: 7, female: 10 },
    { group: '18-25', male: 15, female: 12 },
    { group: '26-40', male: 15, female: 15 },
    { group: '41-60', male: 11, female: 10 },
    { group: '60+', male: 14, female: 12 },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sticky Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="dashboard-content">
        <h1 className="welcome-header">WELCOME DANIKA</h1>

        {/* Top Section: Reminders, To Do, Search & Beneficiaries */}
        <div className="top-grid">
          {/* Left Column */}
          <div className="left-stack">
            <div className="card pattern-card-1">
              <h3 className="card-title">Reminders</h3>
              <div className="card-pattern-overlay"></div>
            </div>
            <div className="card pattern-card-2">
              <h3 className="card-title">To do</h3>
            </div>
          </div>

          {/* Right Column */}
          <div className="right-stack">
            <div className="search-bar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" placeholder="Search" />
            </div>

            <div className="card beneficiaries-card pattern-card-3">
              <h3 className="card-title">Beneficiaries</h3>
              <div className="beneficiaries-list">
                {beneficiaries.map((b) => (
                  <div key={b.name} className="beneficiary-item">
                    <img src={b.img} alt={b.name} />
                    <span>{b.name}</span>
                  </div>
                ))}
              </div>
              <Link className="view-all-btn" to="/beneficiaries">
                View all beneficiaries
              </Link>
              
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="card calendar-card pattern-card-4">
          <h3 className="section-heading">Calendar</h3>
          <p className="section-subheading">Upcoming Events</p>
          <div className="calendar-events-grid">
            {calendarEvents.map((ev, i) => (
              <div key={i} className="event-col">
                <span className="event-title">{ev.title}</span>
                <span className="event-time">{ev.time}</span>
                <span className="event-date">{ev.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Disability Chart Section */}
        <div className="card chart-card pattern-card-5">
          <div className="disability-layout">
            <div className="bar-chart-container">
              <div className="bars-wrapper">
                {disabilityData.map((d) => (
                  <div key={d.type} className="bar-column">
                    <span className="bar-value">{d.count}</span>
                    <div
                      className="bar-fill"
                      style={{
                        height: `${(d.count / 22) * 120}px`,
                        backgroundColor: d.color,
                      }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="chart-baseline"></div>
            </div>

            <div className="disability-legend">
              <div className="legend-header">
                <h3>Disability</h3>
                <span>Beneficiaries</span>
              </div>
              <div className="legend-list">
                {disabilityData.map((d) => (
                  <div key={d.type} className="legend-item">
                    <span className="dot" style={{ backgroundColor: d.color }}></span>
                    <span className="label">{d.type}</span>
                    <span className="count">{d.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dietary Requirements Section */}
        <div className="card dietary-card pattern-card-6">
          <h3 className="section-title-left">Dietary Requirements</h3>
          <div className="dietary-list">
            {dietaryData.map((item) => (
              <div key={item.label} className="dietary-row">
                <span className="dietary-label">{item.label}</span>
                <div className="progress-bg">
                  <div
                    className="progress-fill"
                    style={{ width: item.percent, backgroundColor: item.color }}
                  ></div>
                </div>
                <span className="dietary-val">{item.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Age and Gender Section */}
        <div className="card age-gender-card pattern-card-7">
          <h3 className="section-title-left">Age and Gender</h3>
          
          <div className="gender-legend">
            <span className="legend-dot male-dot"></span>
            <span className="legend-text">Male</span>
            <span className="legend-dot female-dot"></span>
            <span className="legend-text">Female</span>
          </div>

          <div className="dual-bar-chart">
            <div className="grouped-bars-wrapper">
              {ageGenderData.map((ag) => (
                <div key={ag.group} className="age-group-col">
                  <div className="bars-pair">
                    <div className="bar-wrapper">
                      <span className="val-top">{ag.male}</span>
                      <div
                        className="bar male-bar"
                        style={{ height: `${(ag.male / 15) * 130}px` }}
                      ></div>
                    </div>
                    <div className="bar-wrapper">
                      <span className="val-top">{ag.female}</span>
                      <div
                        className="bar female-bar"
                        style={{ height: `${(ag.female / 15) * 130}px` }}
                      ></div>
                    </div>
                  </div>
                  <span className="group-label">{ag.group}</span>
                </div>
              ))}
            </div>
            <div className="chart-baseline"></div>
          </div>
        </div>
      </main>
    </div>
  );
}