import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ApiService from '../../service/ApiService';

const RoomSearch = ({ handleSearchResult }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [roomType, setRoomType] = useState('');
  const [roomTypes, setRoomTypes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types);
      } catch (error) {
        console.error('Error fetching room types:', error.message);
      }
    };
    fetchRoomTypes();
  }, []);

  const showError = (message, timeout = 5000) => {
    setError(message);
    setTimeout(() => setError(''), timeout);
  };

  const handleInternalSearch = async () => {
    if (!startDate || !endDate || !roomType) {
      showError('⚠️ Please select check-in date, check-out date, and room type.');
      return;
    }
    try {
      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];
      const response = await ApiService.getAvailableRoomsByDateAndType(
        formattedStartDate, formattedEndDate, roomType
      );
      if (response.statusCode === 200) {
        if (response.roomList.length === 0) {
          showError('No rooms available for the selected dates and type. Try different options.');
          return;
        }
        handleSearchResult(response.roomList);
        setError('');
      }
    } catch (error) {
      showError('An error occurred: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <section className="search-section">
      <div className="search-container">
        <div className="search-field">
          <label>📅 Check-in Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select date"
            minDate={new Date()}
          />
        </div>
        <div className="search-field">
          <label>📅 Check-out Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select date"
            minDate={startDate || new Date()}
          />
        </div>
        <div className="search-field">
          <label>🛏️ Room Type</label>
          <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
            <option disabled value="">Choose room type</option>
            {roomTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <button className="home-search-button" onClick={handleInternalSearch}>
          Search
        </button>
      </div>
      {error && <p className="error-message" style={{ margin: '0 0 0', borderRadius: 0 }}>{error}</p>}
    </section>
  );
};

export default RoomSearch;
