import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditBookingPage = () => {
  const navigate = useNavigate();
  const { bookingCode } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await ApiService.getBookingByConfirmationCode(bookingCode);
        setBookingDetails(response.booking);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };
    fetchBookingDetails();
  }, [bookingCode]);

  const archiveBooking = async (bookingId) => {
    if (!window.confirm('Archive this booking? The guest will be notified.')) return;
    try {
      const response = await ApiService.cancelBooking(bookingId);
      if (response.statusCode === 200) {
        setSuccess('✅ Booking archived successfully.');
        setTimeout(() => {
          setSuccess('');
          navigate('/admin/manage-bookings');
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div className="find-booking-page">
      <span className="section-label">Admin Panel</span>
      <h2>Booking Detail</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      {bookingDetails && (
        <div className="booking-details">
          <h3>📋 Booking Info</h3>
          <p><strong>Confirmation Code:</strong> {bookingDetails.bookingConfirmationCode}</p>
          <p><strong>Check-in:</strong> {bookingDetails.checkInDate}</p>
          <p><strong>Check-out:</strong> {bookingDetails.checkOutDate}</p>
          <p><strong>Adults:</strong> {bookingDetails.numOfAdults}</p>
          <p><strong>Children:</strong> {bookingDetails.numOfChildren}</p>

          <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }}></div>
          <h3>👤 Guest Info</h3>
          {bookingDetails.user && (
            <>
              <p><strong>Name:</strong> {bookingDetails.user.name}</p>
              <p><strong>Email:</strong> {bookingDetails.user.email}</p>
              <p><strong>Phone:</strong> {bookingDetails.user.phoneNumber}</p>
            </>
          )}

          <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }}></div>
          <h3>🛏️ Room Info</h3>
          {bookingDetails.room && (
            <>
              <p><strong>Room Type:</strong> {bookingDetails.room.roomType}</p>
              <p><strong>Price:</strong> ${bookingDetails.room.roomPrice} / night</p>
              <p><strong>Description:</strong> {bookingDetails.room.roomDescription}</p>
              <img
                src={bookingDetails.room.roomPhotoUrl}
                alt={bookingDetails.room.roomType}
                style={{ borderRadius: 'var(--radius-sm)', marginTop: 12, maxHeight: 200, width: '100%', objectFit: 'cover' }}
              />
            </>
          )}

          <button
            className="acheive-booking"
            onClick={() => archiveBooking(bookingDetails.id)}
          >
            🗃️ Archive Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBookingPage;
