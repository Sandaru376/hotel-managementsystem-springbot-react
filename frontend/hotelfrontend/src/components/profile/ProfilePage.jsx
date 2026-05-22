import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await ApiService.getUserProfile();
        const userPlusBookings = await ApiService.getUserBookings(response.user.id);
        setUser(userPlusBookings.user);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };
    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    ApiService.logout();
    navigate('/home');
  };

  return (
    <div className="profile-page">
      {user && (
        <h2>
          👋 Welcome back,{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>{user.name}</em>
        </h2>
      )}
      {error && <p className="error-message">{error}</p>}

      <div className="profile-actions">
        <button onClick={() => navigate('/edit-profile')}>✏️ Edit Profile</button>
        <button onClick={handleLogout}>🚪 Sign Out</button>
      </div>

      {user && (
        <>
          {/* Profile Details Card */}
          <div className="profile-details">
            <h3>👤 Profile Details</h3>
            <p><strong>Name</strong> {user.name}</p>
            <p><strong>Email</strong> {user.email}</p>
            <p><strong>Phone</strong> {user.phoneNumber}</p>
          </div>

          {/* Bookings */}
          <div className="bookings-section">
            <h3>📋 Booking History</h3>
            <div className="booking-list">
              {user.bookings && user.bookings.length > 0 ? (
                user.bookings.map((booking) => (
                  <div key={booking.id} className="booking-item">
                    <p>
                      <strong>Confirmation Code</strong>
                      <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
                        {booking.bookingConfirmationCode}
                      </span>
                    </p>
                    <p><strong>Check-in</strong> {booking.checkInDate}</p>
                    <p><strong>Check-out</strong> {booking.checkOutDate}</p>
                    <p><strong>Total Guests</strong> {booking.totalNumOfGuest}</p>
                    <p><strong>Room Type</strong> {booking.room?.roomType}</p>
                    {booking.room?.roomPhotoUrl && (
                      <img
                        src={booking.room.roomPhotoUrl}
                        alt="Room"
                        className="room-photo"
                      />
                    )}
                  </div>
                ))
              ) : (
                <div style={{
                  background: 'var(--bg-soft)', border: '1.5px dashed var(--border)',
                  borderRadius: 'var(--radius)', padding: '32px', textAlign: 'center'
                }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>🛏️</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 16 }}>
                    You haven't made any bookings yet.
                  </p>
                  <a href="/rooms" style={{
                    display: 'inline-block', background: 'var(--primary)',
                    color: '#fff', padding: '10px 24px', borderRadius: 'var(--radius-sm)',
                    fontSize: 14, fontWeight: 600
                  }}>
                    Browse Rooms →
                  </a>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
