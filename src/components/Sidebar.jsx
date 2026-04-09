import React from 'react';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  FileText, 
  Search, 
  Building2, 
  User, 
  Settings 
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> }
  ];

  return (
    <aside className="sidebar">
      {/* Logo Section */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15 8H9L12 2Z" fill="var(--primary)"/>
            <path d="M12 22C12 22 18 16 18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C6 16 12 22 12 22Z" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="logo-text">
          <h2>Village Services</h2>
          <p>Smart Rural Service<br/>Coordination Platform</p>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.id} className={activeTab === item.id ? 'active' : ''}>
              <button onClick={() => setActiveTab(item.id)}>
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </button>
            </li>
          ))}
        </ul>


      </nav>

    </aside>
  );
};

export default Sidebar;
