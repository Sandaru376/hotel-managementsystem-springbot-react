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
      {/* Welcome header */}
      <div style={{ fontSize: 48, marginBottom: 16 }}>🏨</div>
      <h1 className="welcome-message">
        Hello, <em>{adminName || 'Admin'}</em>
      </h1>
      <p className="admin-subtitle">
        Manage your hotel rooms, bookings and guests all in one place
      </p>

      {/* Quick stats */}
      <div style={{
        display: 'flex', gap: 12, justifyContent: 'center',
        marginBottom: 40, flexWrap: 'wrap'
      }}>
        {[
          { icon: '🛏️', label: 'Manage rooms, add or remove listings' },
          { icon: '📋', label: 'View and cancel guest bookings' },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--primary-pale)', border: '1.5px solid var(--primary)',
            borderRadius: 'var(--radius-sm)', padding: '10px 20px',
            fontSize: 13, color: 'var(--primary)', fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 8
          }}>
            <span>{item.icon}</span> {item.label}
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="admin-actions">
        <button
          className="admin-button"
          onClick={() => navigate('/admin/manage-rooms')}
        >
          <span className="btn-icon">🛏️</span>
          <span>Manage Rooms</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 400 }}>
            Add, edit &amp; remove rooms
          </span>
        </button>
        <button
          className="admin-button"
          onClick={() => navigate('/admin/manage-bookings')}
        >
          <span className="btn-icon">📋</span>
          <span>Manage Bookings</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 400 }}>
            View &amp; archive reservations
          </span>
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
