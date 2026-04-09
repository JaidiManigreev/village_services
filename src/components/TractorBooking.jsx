import React, { useState, useEffect } from 'react';
import { Search, Filter, Bell, CalendarIcon, Tractor, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import './TractorBooking.css';

const TractorBooking = ({ onBack }) => {
  const [dateRequired, setDateRequired] = useState('');
  const [bookerName, setBookerName] = useState('');
  const [bookerContact, setBookerContact] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const res = await api.get('/bookings/my-bookings');
      setMyBookings(res.data.filter(b => b.bookingType === 'Tractor'));
    } catch (e) {}
  };

  const handleBook = async (item) => {
    if (!localStorage.getItem('token')) return alert('Please login first.');
    if (!dateRequired) return alert('Please select a Date Required from the filter section.');
    try {
      await api.post('/bookings', {
        bookingType: 'Tractor',
        equipmentCategory: item.category,
        equipmentType: item.type,
        dateRequired,
        bookerName,
        bookerContact
      });
      alert(`Successfully booked ${item.type}!`);
      fetchMyBookings();
    } catch (err) {
      alert(err.response?.data?.message || 'Error occurred');
    }
  };

  const equipment = [
    { id: 1, category: 'Ploughing', type: 'Mould Board Plough', owner: 'Ramu Singh', phone: '+91-XXXXX-XXXXX', available: 'Yes', price: '₹500/hr' },
    { id: 2, category: 'Ploughing', type: 'Rotavator (Rotary Tiller)', owner: 'Gurpreet Singh', phone: '+91-XXXXX-XXXXX', available: 'Yes', price: '₹600/hr' },
    { id: 3, category: 'Ploughing', type: 'Laser Land Leveller', owner: 'Balwinder', phone: '+91-XXXXX-XXXXX', available: 'No', price: '₹450/hr' },
    { id: 4, category: 'Sowing', type: 'Seed Drill', owner: 'Ramesh Kumar', phone: '+91-XXXXX-XXXXX', available: 'Yes', price: '₹300/hr' },
    { id: 5, category: 'Maize', type: 'Maize Sheller', owner: 'Sukhdev', phone: '+91-XXXXX-XXXXX', available: 'Yes', price: '₹350/hr' },
    { id: 6, category: 'Turmeric', type: 'Turmeric Polishing Machine', owner: 'Harjeet', phone: '+91-XXXXX-XXXXX', available: 'Yes', price: '₹1200/day' },
    { id: 7, category: 'Harvesting', type: 'Combine Harvester', owner: 'Jaswant', phone: '+91-XXXXX-XXXXX', available: 'No', price: '₹2000/hr' },
    { id: 8, category: 'Irrigation', type: 'Drone Sprayer', owner: 'TechAgri', phone: '+91-XXXXX-XXXXX', available: 'Yes', price: '₹800/acre' },
    { id: 9, category: 'Transport', type: 'Tractor Trailer / Trolley', owner: 'Amritpal', phone: '+91-XXXXX-XXXXX', available: 'Yes', price: '₹500/trip' },
    { id: 10, category: 'Ploughing', type: 'Cultivator', owner: 'Manish', phone: '+91-XXXXX-XXXXX', available: 'Yes', price: '₹300/hr' },
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
            <h2>Tractor/Equipment Booking</h2>
            <p className="subtitle">Rent farm machinery easily</p>
          </div>
        </div>
      </header>

      <div className="tractor-content">
        <aside className="tractor-filters">
          <div className="filter-header">
            <h3>Filters</h3>
          </div>
          <div className="filter-form">
            <div className="form-group">
              <label>Equipment Category</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="All">All Categories</option>
                <option value="Ploughing">Ploughing & Land Prep</option>
                <option value="Sowing">Sowing & Planting</option>
                <option value="Maize">Maize Machines</option>
                <option value="Turmeric">Turmeric Processing</option>
                <option value="Harvesting">Harvesting</option>
                <option value="Irrigation">Irrigation / Drones</option>
                <option value="Transport">Transport / Loaders</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date Required</label>
              <div className="date-input">
                <input type="text" placeholder="e.g. 25 Mar" value={dateRequired} onChange={(e) => setDateRequired(e.target.value)} />
                <CalendarIcon size={16} />
              </div>
            </div>
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" placeholder="Enter your name" value={bookerName} onChange={(e) => setBookerName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input type="text" placeholder="Phone number" value={bookerContact} onChange={(e) => setBookerContact(e.target.value)} />
            </div>
          </div>
        </aside>

        <main className="tractor-list-section">
          <div className="list-controls">
             <div className="pill-filters">
              <button className="pill active">All</button>
              <button className="pill">Tractors</button>
              <button className="pill">Implements</button>
            </div>
            <div className="search-bar">
              <Search size={18} color="var(--text-muted)" />
              <input type="text" placeholder="Search equipment..." />
              <button className="filter-btn"><Filter size={18} /></button>
            </div>
          </div>

          <div className="equipment-list">
            {equipment.filter(item => selectedCategory === 'All' || item.category === selectedCategory).map(item => (
              <div className="equipment-card" key={item.id}>
                <div className="equipment-avatar">
                   <Tractor size={24} />
                </div>
                <div className="equipment-info">
                  <h4>{item.type}</h4>
                  <p>Category: {item.category} | Owner: {item.owner}</p>
                  <p>Rate: <strong>{item.price}</strong></p>
                  <p className="item-status">Status: <span className={item.available === 'Yes' ? 'avail-yes' : 'avail-no'}>{item.available === 'Yes' ? 'Available' : 'Booked'}</span></p>
                </div>
                <button 
                   className="primary-btn confirm-btn" 
                   disabled={item.available !== 'Yes'}
                   style={{ opacity: item.available === 'Yes' ? 1 : 0.5 }}
                   onClick={() => handleBook(item)}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
          
          <div className="pagination">
             <span>Your Tractor Bookings ({myBookings.length})</span>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TractorBooking;
