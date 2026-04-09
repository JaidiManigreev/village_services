import React, { useState, useEffect } from 'react';
import { Search, Filter, Bell, CalendarIcon, Filter as FilterIcon, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import './LaborBooking.css';

const LaborBooking = ({ onBack }) => {
  const [formData, setFormData] = useState({ 
    date: '', timeDuration: 'Full Day', description: '', workType: 'Paddy Planting',
    bookerName: '', bookerContact: '', numberOfLabors: 1
  });
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const res = await api.get('/bookings/my-bookings');
      setMyBookings(res.data.filter(b => b.bookingType === 'Labor'));
    } catch (e) {}
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleBook = async (worker) => {
    if (!localStorage.getItem('token')) return alert('Please login first.');
    if (!formData.date) return alert('Please input Date in filters first.');
    try {
      await api.post('/bookings', {
        bookingType: 'Labor',
        workerCategory: worker.category,
        workType: formData.workType,
        dateRequired: formData.date,
        timeDuration: formData.timeDuration,
        description: formData.description,
        bookerName: formData.bookerName,
        bookerContact: formData.bookerContact,
        numberOfLabors: formData.numberOfLabors
      });
      alert(`Successfully booked ${formData.numberOfLabors} labors for ${worker.category}!`);
      fetchMyBookings();
    } catch (err) {
      alert(err.response?.data?.message || 'Error occurred');
    }
  };

  const workers = [
    { id: 1, initials: 'RD', name: 'Radha Devi', phone: '+91-XXXXX-XXXXX', type: 'Paddy Planting', category: 'Ladies', date: '25 Mar 2026', time: 'Full Day 9 AM - 5 PM' },
    { id: 2, initials: 'RD', name: 'Ravi Das', phone: '+91-XXXXX-XXXXX', type: 'Paddy Planting', category: 'Boys', date: '25 Mar 2026', time: 'Full Day' },
    { id: 3, initials: 'RD', name: 'Reena Devi', phone: '+91-XXXXX-XXXXX', type: 'Paddy Planting', category: 'Ladies', date: '25 Mar 2026', time: 'Full Day' },
    { id: 4, initials: 'RK', name: 'Ramesh Kumar', phone: '+91-XXXXX-XXXXX', type: 'Paddy Planting', category: 'Boys', date: '25 Mar 2026', time: 'Full Day' },
  ];

  return (
    <div className="feature-view">
      <header className="feature-header">
        <div className="header-title" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {onBack && (
            <button onClick={onBack} className="back-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', backgroundColor: 'var(--surface-white)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
              <ArrowLeft size={20} color="var(--primary)" />
            </button>
          )}
          <div>
            <h2>Labor Booking</h2>
            <p className="subtitle">Sun, 22 March 2026</p>
          </div>
        </div>
      </header>

      <div className="labor-content">
        <aside className="labor-filters">
          <div className="filter-header">
            <h3>Categories</h3>
          </div>
          <div className="filter-form">
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" name="bookerName" placeholder="Enter your name" value={formData.bookerName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input type="text" name="bookerContact" placeholder="Phone number" value={formData.bookerContact} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Number of Labors</label>
              <input type="number" name="numberOfLabors" min="1" value={formData.numberOfLabors} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Work Type</label>
              <select name="workType" value={formData.workType} onChange={handleChange}>
                <option value="Paddy Planting">Paddy Planting</option>
                <option value="Maize Harvesting">Maize Harvesting</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <div className="date-input">
                <input type="text" name="date" placeholder="e.g. 25 Mar" value={formData.date} onChange={handleChange} />
                <CalendarIcon size={16} />
              </div>
            </div>
            <div className="form-group">
              <label>Time</label>
              <select name="timeDuration" value={formData.timeDuration} onChange={handleChange}>
                <option value="Full Day">Full Day 9 AM - 5 PM</option>
                <option value="Morning">Morning 7 AM - 11 AM</option>
              </select>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea rows="4" name="description" placeholder="Brief description of work" value={formData.description} onChange={handleChange}></textarea>
            </div>
          </div>
        </aside>

        <main className="labor-list-section">
          <div className="list-controls">
            <div className="pill-filters">
              <button className="pill active">All</button>
              <button className="pill">Ladies</button>
              <button className="pill">Boys</button>
            </div>
            <div className="search-bar">
              <Search size={18} color="var(--text-muted)" />
              <input type="text" placeholder="Search" />
              <button className="filter-btn"><Filter size={18} /></button>
            </div>
          </div>

          <div className="worker-list">
            {workers.map(worker => (
              <div className="worker-card" key={worker.id}>
                <div className="worker-avatar">{worker.initials}</div>
                <div className="worker-info">
                  <h4>{worker.name}</h4>
                  <p>{worker.phone}</p>
                  <p>{worker.type} <span className="cat-divider">|</span> {worker.category}</p>
                  <p className="worker-time">Time: {worker.time} <br/> Date: {worker.date}</p>
                </div>
                <button className="primary-btn confirm-btn" onClick={() => handleBook(worker)}>Confirm Booking</button>
              </div>
            ))}
          </div>
          
          <div className="pagination">
            <span>Your Confirmed Bookings ({myBookings.length})</span>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LaborBooking;
