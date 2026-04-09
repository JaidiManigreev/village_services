import React, { useState, useEffect } from 'react';
import { Trash2, Key, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import './DriverLog.css';

const DriverLog = ({ onBack }) => {
  const [formData, setFormData] = useState({ date: '22 Mar 2026', time: '', ownerName: '', locationField: '', equipmentUsed: '' });
  const [currentLogs, setCurrentLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    if (!localStorage.getItem('token')) return;
    try {
      const res = await api.get('/driver-logs/my-logs');
      setCurrentLogs(res.data);
    } catch (e) {}
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddEntry = async () => {
    if (!localStorage.getItem('token')) return alert('Please login first to enter logs.');
    try {
      await api.post('/driver-logs', formData);
      alert('Log Entry Added!');
      setFormData({ date: formData.date, time: '', ownerName: '', locationField: '', equipmentUsed: '' });
      fetchLogs();
    } catch (err) {
      alert(err.response?.data?.message || 'Error occurred');
    }
  };

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
            <h2>Driver Daily Work Log</h2>
            <p className="subtitle">Manage and track equipment work</p>
          </div>
        </div>
      </header>

      <div className="driver-content">
        <aside className="driver-auth-panel">
          <div className="auth-box">
            <div className="auth-icon">
              <Key size={32} color="var(--primary)" />
            </div>
            <h3>Driver Access ID</h3>
            <p>Please verify your driver ID to enter work logs.</p>
            <input type="text" placeholder="Enter Driver ID" />
            <button className="primary-btn">Verify Driver ID</button>
          </div>
        </aside>

        <main className="driver-log-panel">
          <div className="log-form-wrapper">
            <h3>Add New Entry</h3>
            <form className="log-form">
              <div className="form-group half">
                <label>Date</label>
                <input type="text" name="date" value={formData.date} onChange={handleChange} />
              </div>
              <div className="form-group half">
                <label>Time</label>
                <input type="text" name="time" placeholder="Time" value={formData.time} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Owner Name</label>
                <input type="text" name="ownerName" placeholder="Owner Name" value={formData.ownerName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Field/Location</label>
                <input type="text" name="locationField" placeholder="Field/Location" value={formData.locationField} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Equipment Used</label>
                <input type="text" name="equipmentUsed" placeholder="Equipment Used" value={formData.equipmentUsed} onChange={handleChange} />
              </div>
              <button className="primary-btn add-entry-btn" type="button" onClick={handleAddEntry}>Add Entry</button>
            </form>
          </div>

          <div className="current-log-list">
            <h3>Current Log</h3>
            <div className="logs-container">
              {currentLogs.length === 0 ? <p style={{color:'var(--text-muted)'}}>No logs added yet.</p> : currentLogs.map((log) => (
                <div className="log-card" key={log._id}>
                  <div className="log-details">
                    <p><strong>Date:</strong> {log.date}</p>
                    <p><strong>Owner Name:</strong> {log.ownerName}</p>
                    <p><strong>Location:</strong> {log.locationField}</p>
                    <p><strong>Equipment:</strong> {log.equipmentUsed}</p>
                    <p><strong>Time:</strong> {log.time}</p>
                  </div>
                  <button className="delete-log-btn">
                    <Trash2 size={18} /> Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DriverLog;
