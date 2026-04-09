import React, { useState, useEffect } from 'react';
import { Tractor, Users, MessageSquareWarning, Truck, Stethoscope } from 'lucide-react';
import LoginModal from './LoginModal';
import './Dashboard.css';
import './Dashboard.css';

const Dashboard = ({ onNavigate }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };
  const actions = [
    {
      id: 'tractor',
      title: 'Tractor/Equipment Booking',
      icon: <Tractor size={32} color="var(--primary)" />,
      buttonText: 'Tractor/Equipment Booking'
    },
    {
      id: 'labor',
      title: 'Labor Booking',
      icon: <Users size={32} color="var(--primary)" />,
      buttonText: 'Labor Booking'
    },
    {
      id: 'complaint',
      title: 'Village Improvement Complaint System',
      desc: 'Complain village improvement complaint system',
      icon: <MessageSquareWarning size={32} color="var(--primary)" />,
      buttonText: 'Complaint System'
    },
    {
      id: 'driver',
      title: 'Driver Daily Work Entrance',
      icon: <Truck size={32} color="var(--primary)" />,
      buttonText: 'Work Entrance'
    },
    {
      id: 'veterinary',
      title: 'Veterinary Appointment System',
      desc: 'Describe veterinary system on rural entrance',
      icon: <Stethoscope size={32} color="var(--primary)" />,
      buttonText: 'Book Appointment'
    }
  ];

  return (
    <div className="dashboard-content">
      <header className="dashboard-header">
        <nav className="top-nav">
          <a href="#">Home</a>
          <a href="#">Contact Us</a>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>Welcome, {user.name}!</span>
              <button className="login-btn outline-btn" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button className="login-btn primary-btn" onClick={() => setIsLoginOpen(true)}>Login / Signup</button>
          )}
        </nav>
      </header>
      
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />

      <main className="dashboard-main">
        <div className="action-grid">
          {actions.map((action) => (
            <div className="action-card" key={action.id}>
              <div className="card-icon">
                {action.icon}
              </div>
              <h3 className="card-title">{action.title}</h3>
              {action.desc && <p className="card-desc">{action.desc}</p>}
              <div className="card-footer">
                <button 
                  className="primary-btn outline-btn" 
                  onClick={() => onNavigate(action.id)}
                >
                  {action.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
