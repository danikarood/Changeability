import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import '../App.css';

export default function CalendarPage() {
  const [displayedMonth, setDisplayedMonth] = useState(new Date(2027, 1, 1));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [events, setEvents] = useState([
    { id: 1, title: 'Awareness Workshop', date: '2027-02-07', time: '10:00' },
    { id: 2, title: 'Beneficiary Assessments', date: '2027-02-11', time: '10:00' },
    { id: 3, title: 'Community Participationprogramme', date: '2027-02-19', time: '10:00' },
    { id: 4, title: 'Volunteer orientation', date: '2027-02-28', time: '10:00' },
  ]);

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
    setEvents((previousEvents) => [
      ...previousEvents,
      { id: Date.now(), ...newEvent },
    ]);
    setNewEvent({ title: '', date: '', time: '10:00' });
    setIsModalOpen(false);
  };

  const monthIndex = displayedMonth.getMonth();
  const year = displayedMonth.getFullYear();
  const monthLabel = displayedMonth.toLocaleDateString('en', {
    month: 'long',
    year: 'numeric',
  });
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const leadingDays = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
  const calendarCells = [
    ...Array(leadingDays).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  const monthEvents = events
    .filter((event) => {
      const [eventYear, eventMonth] = event.date.split('-').map(Number);
      return eventYear === year && eventMonth === monthIndex + 1;
    })
    .sort((a, b) => a.date.localeCompare(b.date));
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
            <button
              className="arrow-btn"
              aria-label="Previous month"
              onClick={() => setDisplayedMonth(new Date(year, monthIndex - 1, 1))}
            >
              &#9664;
            </button>
            <h1 className="month-title">{monthLabel}</h1>
            <button
              className="arrow-btn"
              aria-label="Next month"
              onClick={() => setDisplayedMonth(new Date(year, monthIndex + 1, 1))}
            >
              &#9654;
            </button>
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
              {monthEvents.map((ev) => (
                <div key={ev.id} className="upcoming-event-card">
                  <span className="upcoming-event-name">{ev.title}</span>
                  <div className="upcoming-event-footer">
                    <span className="upcoming-event-date">
                      {new Date(`${ev.date}T00:00:00`).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'numeric',
                        year: '2-digit',
                      })}
                    </span>
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
            {calendarCells.map((dayNum, index) => {
              if (dayNum === null) {
                return <div key={`empty-${index}`} className="calendar-day-cell empty-day-cell" aria-hidden="true" />;
              }
              const dayEvents = monthEvents.filter((event) => Number(event.date.slice(-2)) === dayNum);

              return (
                <div
                  key={`${year}-${monthIndex}-${dayNum}`}
                  className="calendar-day-cell"
                >
                  <span className="day-number">{dayNum}</span>

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
          <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="add-event-title" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 id="add-event-title">Add New Event</h3>
              <button type="button" className="close-btn" aria-label="Close" onClick={() => setIsModalOpen(false)}>&times;</button>
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