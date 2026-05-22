import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';

const ManageBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await ApiService.getAllBookings();
        const allBookings = response.bookingList;
        setBookings(allBookings);
        setFilteredBookings(allBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error.message);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter((booking) =>
        booking.bookingConfirmationCode &&
        booking.bookingConfirmationCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBookings(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, bookings]);

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  return (
    <div className="bookings-container">
      <span className="section-label">Admin Panel</span>
      <h2>📋 All Bookings</h2>

      <div className="search-div">
        <label>🔍 Search by Confirmation Code:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter booking code…"
        />
        {searchTerm && (
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            {filteredBookings.length} result{filteredBookings.length !== 1 ? 's' : ''} found
          </span>
        )}
      </div>

      {currentBookings.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px 20px',
          background: 'var(--bg-soft)', borderRadius: 'var(--radius)',
          border: '1.5px dashed var(--border)'
        }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📭</div>
          <p style={{ color: 'var(--text-muted)' }}>No bookings found.</p>
        </div>
      ) : (
        <div className="booking-results">
          {currentBookings.map((booking) => (
            <div key={booking.id} className="booking-result-item">
              <p>
                <strong>Booking Code:</strong>{' '}
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
                  {booking.bookingConfirmationCode}
                </span>
              </p>
              <p><strong>Check-in:</strong> {booking.checkInDate}</p>
              <p><strong>Check-out:</strong> {booking.checkOutDate}</p>
              <p><strong>Total Guests:</strong> {booking.totalNumOfGuest}</p>
              <button
                className="edit-room-button"
                onClick={() => navigate(`/admin/edit-booking/${booking.bookingConfirmationCode}`)}
              >
                Manage Booking →
              </button>
            </div>
          ))}
        </div>
      )}

      <Pagination
        roomsPerPage={bookingsPerPage}
        totalRooms={filteredBookings.length}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />
    </div>
  );
};

export default ManageBookingsPage;
