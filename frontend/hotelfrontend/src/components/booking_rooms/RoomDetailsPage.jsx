import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RoomDetailsPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalGuests, setTotalGuests] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userId, setUserId] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await ApiService.getRoomById(roomId);
        setRoomDetails(response.room);
        const userProfile = await ApiService.getUserProfile();
        setUserId(userProfile.user.id);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [roomId]);

  const handleConfirmBooking = () => {
    if (!checkInDate || !checkOutDate) {
      setErrorMessage('Please select check-in and check-out dates.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }
    if (isNaN(numAdults) || numAdults < 1 || isNaN(numChildren) || numChildren < 0) {
      setErrorMessage('Please enter valid numbers for adults and children.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }
    const oneDay = 24 * 60 * 60 * 1000;
    const totalDays = Math.round(Math.abs((new Date(checkOutDate) - new Date(checkInDate)) / oneDay));
    if (totalDays < 1) {
      setErrorMessage('Check-out date must be after check-in date.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }
    setTotalPrice(roomDetails.roomPrice * totalDays);
    setTotalGuests(numAdults + numChildren);
  };

  const acceptBooking = async () => {
    try {
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);
      const fmt = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split('T')[0];
      const booking = {
        checkInDate: fmt(startDate),
        checkOutDate: fmt(endDate),
        numOfAdults: numAdults,
        numOfChildren: numChildren,
      };
      const response = await ApiService.bookRoom(roomId, userId, booking);
      if (response.statusCode === 200) {
        setConfirmationCode(response.bookingConfirmationCode);
        setShowMessage(true);
        setTimeout(() => { setShowMessage(false); navigate('/rooms'); }, 10000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  if (isLoading) return <p className="room-detail-loading">Loading room details…</p>;
  if (error) return <p className="room-detail-loading">{error}</p>;
  if (!roomDetails) return <p className="room-detail-loading">Room not found.</p>;

  const { roomType, roomPrice, roomPhotoUrl, description, bookings } = roomDetails;

  return (
    <div className="room-details-booking">
      {showMessage && (
        <p className="booking-success-message">
          ✓ Booking confirmed! Your code: <strong>{confirmationCode}</strong>. Confirmation details have been sent to your email.
        </p>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <img src={roomPhotoUrl} alt={roomType} className="room-details-image" />

      <div className="room-details-info">
        <h3>{roomType}</h3>
        <p className="price-tag">${roomPrice} <span style={{ fontSize: 16, color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>/ night</span></p>
        <p>{description}</p>
      </div>

      {bookings && bookings.length > 0 && (
        <div style={{ width: '100%', maxWidth: 700, marginBottom: 32 }}>
          <h3 className="existing-bookings-title">Existing Bookings</h3>
          <ul className="booking-list">
            {bookings.map((booking, index) => (
              <li key={booking.id} className="booking-item">
                <span className="booking-number">#{index + 1}</span>
                <span className="booking-text">Check-in: {booking.checkInDate}</span>
                <span className="booking-text">Check-out: {booking.checkOutDate}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="booking-info" style={{ width: '100%', maxWidth: 700 }}>
        <div className="booking-actions-row">
          <button className="book-now-button" onClick={() => setShowDatePicker(true)}>
            Book This Room
          </button>
          {showDatePicker && (
            <button className="go-back-button" onClick={() => { setShowDatePicker(false); setTotalPrice(0); }}>
              Cancel
            </button>
          )}
        </div>

        {showDatePicker && (
          <div className="date-picker-container">
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20, letterSpacing: '0.05em' }}>
              Select your stay dates and number of guests
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
              <DatePicker
                className="detail-search-field"
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                selectsStart
                startDate={checkInDate}
                endDate={checkOutDate}
                placeholderText="Check-in Date"
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
              />
              <DatePicker
                className="detail-search-field"
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                selectsEnd
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={checkInDate}
                placeholderText="Check-out Date"
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div className="guest-container">
              <div className="guest-div">
                <label>Adults</label>
                <input
                  type="number"
                  min="1"
                  value={numAdults}
                  onChange={(e) => setNumAdults(parseInt(e.target.value))}
                />
              </div>
              <div className="guest-div">
                <label>Children</label>
                <input
                  type="number"
                  min="0"
                  value={numChildren}
                  onChange={(e) => setNumChildren(parseInt(e.target.value))}
                />
              </div>
              <button className="confirm-booking" onClick={handleConfirmBooking}>
                Calculate
              </button>
            </div>
          </div>
        )}

        {totalPrice > 0 && (
          <div className="total-price">
            <p>Total for your stay</p>
            <span className="price-amount">${totalPrice}</span>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>
              {totalGuests} guest{totalGuests > 1 ? 's' : ''}
            </p>
            <button onClick={acceptBooking} className="accept-booking">
              Confirm & Book
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetailsPage;