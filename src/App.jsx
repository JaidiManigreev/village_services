import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import './App.css';

import LaborBooking from './components/LaborBooking';
import ComplaintSystem from './components/ComplaintSystem';
import VetAppointment from './components/VetAppointment';
import DriverLog from './components/DriverLog';
import TractorBooking from './components/TractorBooking';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentView, setCurrentView] = useState('dashboard');

  // Handle navigation from sidebar
  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'dashboard') setCurrentView('dashboard');
  };

  const navigateToFeature = (featureId) => {
    setCurrentView(featureId);
    setActiveTab(featureId);
  };

  const goBackToDashboard = () => {
    setCurrentView('dashboard');
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={navigateToFeature} />;
      case 'labor':
        return <LaborBooking onBack={goBackToDashboard} />;
      case 'complaint':
        return <ComplaintSystem onBack={goBackToDashboard} />;
      case 'veterinary':
        return <VetAppointment onBack={goBackToDashboard} />;
      case 'driver':
        return <DriverLog onBack={goBackToDashboard} />;
      case 'tractor':
        return <TractorBooking onBack={goBackToDashboard} />;
      default:
        return <Dashboard onNavigate={navigateToFeature} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={handleNavClick} />
      <div className="main-content-wrapper">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
