import React, { useState } from 'react';
import api from '../services/api';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', password: '', aadhaar: '' });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegistering) {
        // Register API call
        await api.post('/auth/register', formData);
        setIsRegistering(false);
        setError('Success! Please login now.');
      } else {
        // Login API call
        const response = await api.post('/auth/login', { phone: formData.phone, password: formData.password });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        onLoginSuccess(response.data.user);
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isRegistering ? 'Create Account' : 'Village Login'}</h2>
        {error && <p className="error-msg">{error}</p>}
        
        <form onSubmit={handleSubmit} className="login-form">
          {isRegistering && (
            <>
              <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
              <input type="text" name="aadhaar" placeholder="Aadhaar Number (Optional)" onChange={handleChange} />
            </>
          )}
          <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          
          <button type="submit" className="primary-btn">{isRegistering ? 'Register' : 'Login'}</button>
        </form>

        <p className="toggle-text">
          {isRegistering ? 'Already have an account? ' : 'New to Village Services? '}
          <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Login here' : 'Register here'}
          </button>
        </p>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LoginModal;
