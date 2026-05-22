import React, { useState } from 'react';
import ApiService from '../../service/ApiService';

const FindBookingPage = () => {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!confirmationCode.trim()) {
      setError('Please enter a booking confirmation code.');
      setTimeout(() => setError(''), 5000);
      return;
    }
    setLoading(true);
    try {
      const response = await ApiService.getBookingByConfirmationCode(confirmationCode);
      setBookingDetails(response.booking);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="find-booking-page">
      <span className="section-label">Self Service</span>
      <h2>Find My Booking</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 28, fontSize: 15 }}>
        Enter your confirmation code to retrieve your booking details.
      </p>

      <div className="search-container">
        <input
          required
          type="text"
          placeholder="e.g. PHG-20241105-XXXX"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? '🔍 Searching…' : '🔍 Find Booking'}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {bookingDetails && (
        <div className="booking-details">
          {/* Booking summary */}
          <h3>✅ Booking Found</h3>
          <p><strong>Confirmation Code:</strong> {bookingDetails.bookingConfirmationCode}</p>
          <p><strong>Check-in Date:</strong> {bookingDetails.checkInDate}</p>
          <p><strong>Check-out Date:</strong> {bookingDetails.checkOutDate}</p>
          <p><strong>Adults:</strong> {bookingDetails.numOfAdults}</p>
          <p><strong>Children:</strong> {bookingDetails.numOfChildren}</p>

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }}></div>
          <h3>👤 Guest Details</h3>
          {bookingDetails.user ? (
            <>
              <p><strong>Name:</strong> {bookingDetails.user.name}</p>
              <p><strong>Email:</strong> {bookingDetails.user.email}</p>
              <p><strong>Phone:</strong> {bookingDetails.user.phoneNumber}</p>
            </>
          ) : (
            <p>Guest details not available.</p>
          )}

          <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }}></div>
          <h3>🛏️ Room Details</h3>
          {bookingDetails.room ? (
            <>
              <p><strong>Room Type:</strong> {bookingDetails.room.roomType}</p>
              <img
                src={bookingDetails.room.roomPhotoUrl}
                alt={bookingDetails.room.roomType}
                style={{ borderRadius: 'var(--radius-sm)', marginTop: 12, maxHeight: 200, width: '100%', objectFit: 'cover' }}
              />
            </>
          ) : (
            <p>Room details not available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FindBookingPage;
