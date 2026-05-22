import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const AdminPage = () => {
  const [adminName, setAdminName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const response = await ApiService.getUserProfile();
        setAdminName(response.user.name);
      } catch (error) {
        console.error('Error fetching admin details:', error.message);
      }
    };
    fetchAdminName();
  }, []);

  return (
    <div className="admin-page">
      <div style={{ fontSize: 52, marginBottom: 20 }}>🏨</div>
      <h1 className="welcome-message">
        Welcome, <em>{adminName || 'Admin'}</em>
      </h1>
      <p className="admin-subtitle">
        Manage rooms, bookings, and guest reservations from your central dashboard.
      </p>

      <div className="admin-actions">
        <button className="admin-button" onClick={() => navigate('/admin/manage-rooms')}>
          <span className="btn-icon">🛏️</span>
          <span>Manage Rooms</span>
          <span style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
            Add, edit &amp; remove listings
          </span>
        </button>
        <button className="admin-button" onClick={() => navigate('/admin/manage-bookings')}>
          <span className="btn-icon">📋</span>
          <span>Manage Bookings</span>
          <span style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
            View &amp; archive reservations
          </span>
        </button>
      </div>
    </div>
  );
};

export default AdminPage;