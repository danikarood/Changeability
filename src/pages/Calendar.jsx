import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import '../App.css';

export default function CalendarPage() {
  const currentMonth = 'February';
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initial events matching your design
  const [events, setEvents] = useState([
    { id: 1, title: 'Awareness Workshop', date: '2027-02-07', displayDate: '7/2/27', dayNumber: 7, time: '10:00' },
    { id: 2, title: 'Beneficiary Assessments', date: '2027-02-11', displayDate: '11/2/27', dayNumber: 11, time: '10:00', highlighted: true },
    { id: 3, title: 'Community Participationprogramme', date: '2027-02-19', displayDate: '19/2/27', dayNumber: 19, time: '10:00' },
    { id: 4, title: 'Volunteer orientation', date: '2027-02-28', displayDate: '28/2/27', dayNumber: 28, time: '10:00' },
  ]);

  // Form State for Modal
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '10:00',
  });

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleAddEventSubmit = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;

    // Format date string (YYYY-MM-DD -> DD/MM/YY & day number)
    const dateObj = new Date(newEvent.date);
    const dayNumber = dateObj.getDate() + 1; // Adjust for timezone offset
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear().toString().slice(-2);
    const displayDate = `${dayNumber}/${month}/${year}`;

    const createdEvent = {
      id: Date.now(),
      title: newEvent.title,
      date: newEvent.date,
      displayDate: displayDate,
      dayNumber: dayNumber,
      time: newEvent.time || '10:00',
    };

    setEvents([...events, createdEvent]);
    setNewEvent({ title: '', date: '', time: '10:00' });
    setIsModalOpen(false);
  };

  // 28 days for February grid
  const daysInMonth = Array.from({ length: 28 }, (_, i) => i + 1);
  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className="page-layout">
      {/* Sticky Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="calendar-main-content">
        {/* Top Header Controls */}
        <div className="calendar-top-bar">
          <div className="month-selector">
            <button className="arrow-btn" aria-label="Previous month">&#9664;</button>
            <h1 className="month-title">{currentMonth}</h1>
            <button className="arrow-btn" aria-label="Next month">&#9654;</button>
          </div>

          <button className="add-event-btn" onClick={() => setIsModalOpen(true)}>
            Add Event
          </button>
        </div>

        {/* 2-Column Calendar Content */}
        <div className="calendar-grid-container">
          {/* Left Column: Upcoming Events List */}
          <div className="upcoming-events-sidebar">
            <h2 className="upcoming-title">Upcoming<br />Events</h2>

            <div className="events-card-stack">
              {events.map((ev) => (
                <div key={ev.id} className="upcoming-event-card">
                  <span className="upcoming-event-name">{ev.title}</span>
                  <div className="upcoming-event-footer">
                    <span className="upcoming-event-date">{ev.displayDate}</span>
                    <span className="upcoming-event-time">{ev.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Month Grid */}
          <div className="calendar-card-grid">
            {/* Weekday Headers */}
            {weekDays.map((day) => (
              <div key={day} className="calendar-weekday-header">
                {day}
              </div>
            ))}

            {/* Day Cells */}
            {daysInMonth.map((dayNum) => {
              const dayEvents = events.filter((e) => e.dayNumber === dayNum);
              const isHighlightDay = dayNum === 11;

              return (
                <div
                  key={dayNum}
                  className={`calendar-day-cell ${isHighlightDay ? 'highlighted-day' : ''}`}
                >
                  <span className={`day-number ${isHighlightDay ? 'highlight-badge' : ''}`}>
                    {dayNum}
                  </span>

                  {dayEvents.map((ev) => (
                    <div key={ev.id} className="event-pill">
                      {ev.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Add Event Modal Popup */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Event</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>

            <form onSubmit={handleAddEventSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="title">Event Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="e.g. Awareness Workshop"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={newEvent.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}