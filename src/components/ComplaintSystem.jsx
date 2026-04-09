import React, { useState, useEffect } from 'react';
import { UploadCloud, MapPin, Trash2, CheckCircle2, Clock, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import './ComplaintSystem.css';

const ComplaintSystem = ({ onBack }) => {
  const [complaints, setComplaints] = useState([]);
  const [formData, setFormData] = useState({ name: '', contact: '', streetNo: '', issueType: 'garbage', description: '' });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await api.get('/complaints');
      setComplaints(res.data);
    } catch (e) { console.error('Failed to load complaints'); }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem('token')) {
      alert("Please login first from the Dashboard before submitting.");
      return;
    }
    try {
      await api.post('/complaints', formData);
      alert('Complaint Submitted Successfully!');
      setFormData({ name: '', contact: '', streetNo: '', issueType: 'garbage', description: '' });
      fetchComplaints(); // Refresh list
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
            <h2>Complaint System</h2>
            <p className="subtitle">Village Improvement</p>
          </div>
        </div>
      </header>

      <div className="complaint-content">
        <div className="complaint-form-wrapper">
          <form className="complaint-form" onSubmit={handleSubmit}>
            <div className="form-group row">
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required />
              <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} placeholder="Contact (+91)" required />
            </div>
            <div className="form-group row">
              <input type="text" name="streetNo" value={formData.streetNo} onChange={handleInputChange} placeholder="Street / Ward No." required />
              <select name="issueType" value={formData.issueType} onChange={handleInputChange}>
                <option value="garbage">Garbage / Waste</option>
                <option value="water">Water Supply</option>
                <option value="electricity">Electricity / Streetlight</option>
                <option value="road">Road Damage</option>
              </select>
            </div>
            <div className="form-group">
              <textarea rows="4" name="description" value={formData.description} onChange={handleInputChange} placeholder="Describe the issue..." required></textarea>
            </div>
            <div className="form-group photo-upload">
              <div className="upload-box">
                <UploadCloud size={32} color="var(--primary)" />
                <p>Click to attach photos</p>
              </div>
            </div>
            <button type="submit" className="primary-btn submit-btn">Submit Complaint</button>
          </form>
        </div>

        <aside className="complaint-sidebar">
          <div className="recent-complaints">
            <h3>Recent Complaints</h3>
            <div className="feed-list">
              {complaints.length === 0 ? <p style={{color: 'var(--text-muted)'}}>No complaints yet.</p> : complaints.map((comp) => (
                <div className="feed-card" key={comp._id}>
                  <div className="feed-icon">
                     <MapPin size={24} />
                  </div>
                  <div className="feed-info">
                    <h4>{comp.issueType.replace(/\b\w/g, l => l.toUpperCase())} at {comp.streetNo}</h4>
                    <p className="feed-date">{new Date(comp.createdAt).toLocaleDateString()}</p>
                    <div className={`status-badge ${comp.status.toLowerCase().replace(' ', '-')}`}>
                       {comp.status === 'Resolved' && <CheckCircle2 size={14} />}
                       {comp.status === 'In Progress' && <Clock size={14} />}
                       <span>{comp.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="complaint-history-dropdown">
            <span>Complaint History (10 items)</span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ComplaintSystem;
