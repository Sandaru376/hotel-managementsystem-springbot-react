import React, { useState } from 'react';
import ApiService from '../../service/ApiService';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phoneNumber: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { name, email, password, phoneNumber } = formData;
    return !!(name && email && password && phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setErrorMessage('Please fill in all fields.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }
    setLoading(true);
    try {
      const response = await ApiService.registerUser(formData);
      if (response.statusCode === 200) {
        setFormData({ name: '', email: '', password: '', phoneNumber: '' });
        setSuccessMessage('Account created successfully. Redirecting to login…');
        setTimeout(() => { setSuccessMessage(''); navigate('/login'); }, 3000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Create Account</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="+1 234 567 890" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" required />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>
        <p className="register-link" style={{ marginTop: 24 }}>
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;