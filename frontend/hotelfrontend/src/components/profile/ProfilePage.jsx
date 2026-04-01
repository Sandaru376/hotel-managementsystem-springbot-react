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
        <h2>Welcome back, <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>{user.name}</em></h2>
      )}
      {error && <p className="error-message">{error}</p>}

      <div className="profile-actions">
        <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
        <button onClick={handleLogout}>Sign Out</button>
      </div>

      {user && (
        <>
          <div className="profile-details">
            <h3>Profile Details</h3>
            <p><strong>Name</strong> {user.name}</p>
            <p><strong>Email</strong> {user.email}</p>
            <p><strong>Phone</strong> {user.phoneNumber}</p>
          </div>

          <div className="bookings-section">
            <h3>Booking History</h3>
            <div className="booking-list">
              {user.bookings && user.bookings.length > 0 ? (
                user.bookings.map((booking) => (
                  <div key={booking.id} className="booking-item">
                    <p><strong>Confirmation Code</strong> {booking.bookingConfirmationCode}</p>
                    <p><strong>Check-in</strong> {booking.checkInDate}</p>
                    <p><strong>Check-out</strong> {booking.checkOutDate}</p>
                    <p><strong>Total Guests</strong> {booking.totalNumOfGuest}</p>
                    <p><strong>Room Type</strong> {booking.room?.roomType}</p>
                    {booking.room?.roomPhotoUrl && (
                      <img src={booking.room.roomPhotoUrl} alt="Room" className="room-photo" />
                    )}
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                  No bookings found. <a href="/rooms" style={{ color: 'var(--gold)' }}>Browse rooms →</a>
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;