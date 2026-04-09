import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Stethoscope, Activity, CheckCircle, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import './VetAppointment.css';

const VetAppointment = ({ onBack }) => {
  const [selectedAnimal, setSelectedAnimal] = useState('Buffalo');
  const [formData, setFormData] = useState({ problemDescription: '', durationOfProblem: '2 days', preferredDate: '', preferredTimeSlot: '10:00 AM - 12:00 PM' });
  const [myAppointments, setMyAppointments] = useState([]);

  useEffect(() => {
    fetchMyAppointments();
  }, []);

  const fetchMyAppointments = async () => {
    try {
      const res = await api.get('/vet-appointments/my-appointments');
      setMyAppointments(res.data);
    } catch (e) {}
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleBook = async () => {
    if (!localStorage.getItem('token')) return alert('Please login first.');
    if (!formData.problemDescription || !formData.preferredDate) return alert('Please fill missing fields');
    try {
      await api.post('/vet-appointments', {
        animalType: selectedAnimal,
        problemDescription: formData.problemDescription,
        durationOfProblem: formData.durationOfProblem,
        preferredDate: formData.preferredDate,
        preferredTimeSlot: formData.preferredTimeSlot
      });
      alert(`Successfully booked Vet for ${selectedAnimal}!`);
      setFormData({ problemDescription: '', durationOfProblem: '2 days', preferredDate: '', preferredTimeSlot: '10:00 AM - 12:00 PM' });
      fetchMyAppointments();
    } catch (err) {
      alert(err.response?.data?.message || 'Error occurred');
    }
  };

  const animals = [
    { id: 'Buffalo', name: 'Buffalo' },
    { id: 'Cow', name: 'Cow' },
    { id: 'Goat', name: 'Goat' },
    { id: 'Sheep', name: 'Sheep' },
    { id: 'Hen', name: 'Hen' }
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
            <h2>Veterinary Appointment</h2>
            <p className="subtitle">Book a doctor for your livestock</p>
          </div>
        </div>
      </header>

      <div className="vet-content">
        <aside className="animal-selection">
          <h3>Animal Selection</h3>
          <div className="animal-grid">
            {animals.map((animal) => (
              <div 
                className={`animal-card ${selectedAnimal === animal.id ? 'active' : ''}`}
                key={animal.id}
              >
                <div className="animal-icon">
                  <Activity size={32} color={selectedAnimal === animal.id ? 'var(--primary)' : 'var(--text-muted)'} />
                </div>
                <h4>{animal.name}</h4>
                <button 
                  className={selectedAnimal === animal.id ? "primary-btn" : "secondary-btn"}
                  onClick={() => setSelectedAnimal(animal.id)}
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        </aside>

        <div className="right-panels">
          <main className="booking-form-panel">
            <div className="selected-animal-header">
              <Activity size={36} color="var(--primary)" />
              <div>
                <span className="small-label">Animal Type</span>
                <h2>{selectedAnimal}</h2>
              </div>
            </div>

            <div className="booking-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <label>Describe the problem</label>
                  <input type="text" name="problemDescription" value={formData.problemDescription} onChange={handleChange} placeholder="E.g., Not eating properly..." />
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <label>Duration</label>
                  <select name="durationOfProblem" value={formData.durationOfProblem} onChange={handleChange}>
                    <option value="2 days">2 days</option>
                    <option value="5 days">5 days</option>
                    <option value="14 days">14 days</option>
                    <option value="Suffering for months">Suffering for months</option>
                  </select>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <label>Preferred Date</label>
                  <div className="date-input">
                    <input type="text" name="preferredDate" value={formData.preferredDate} onChange={handleChange} placeholder="e.g. 18 Mar" />
                    <Calendar size={16} />
                  </div>
                </div>
              </div>
              <div className="step borderless">
                <div className="step-number">4</div>
                <div className="step-content">
                  <label>Preferred Time Slot</label>
                  <select name="preferredTimeSlot" value={formData.preferredTimeSlot} onChange={handleChange}>
                    <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                    <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <button className="primary-btn submit-booking-btn" onClick={handleBook}>
              Book Appointment for {selectedAnimal}
            </button>
          </main>

          <aside className="upcoming-appointments">
            <h3>Upcoming Appointments</h3>
            <div className="appointments-list">
              {myAppointments.length === 0 ? <p style={{color:'var(--text-muted)'}}>No upcoming appointments</p> : myAppointments.map((appt) => (
                <div className="appt-card" key={appt._id}>
                  <div className="dr-initials">{appt.animalType[0]}</div>
                  <div className="appt-info">
                    <h4>{appt.animalType} - {appt.status}</h4>
                    <p className="dr-spec">{appt.problemDescription}</p>
                    <p className="appt-time"><Calendar size={12}/> {appt.preferredDate} • {appt.preferredTimeSlot}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default VetAppointment;
