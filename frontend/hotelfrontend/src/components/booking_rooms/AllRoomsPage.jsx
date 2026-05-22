// AllRoomsPage.jsx
import React, { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';
import RoomResult from '../common/RoomResult';
import RoomSearch from '../common/RoomSearch';

const AllRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  const handleSearchResult = (results) => {
    setRooms(results);
    setFilteredRooms(results);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await ApiService.getAllRooms();
        setRooms(response.roomList);
        setFilteredRooms(response.roomList);
      } catch (error) {
        console.error('Error fetching rooms:', error.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types);
      } catch (error) {
        console.error('Error fetching room types:', error.message);
      }
    };
    fetchRooms();
    fetchRoomTypes();
  }, []);

  const handleRoomTypeChange = (e) => {
    const type = e.target.value;
    setSelectedRoomType(type);
    setFilteredRooms(type === '' ? rooms : rooms.filter((r) => r.roomType === type));
    setCurrentPage(1);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfLastRoom - roomsPerPage, indexOfLastRoom);

  return (
    <div className="all-rooms">
      <div className="rooms-header">
        <div>
          <span className="section-label">Our Collection</span>
          <h2>All Rooms &amp; Suites</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>
            {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''} available
          </p>
        </div>
        <div className="all-room-filter-div">
          <label>Filter by type:</label>
          <select value={selectedRoomType} onChange={handleRoomTypeChange}>
            <option value="">All Rooms</option>
            {roomTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Search by date/type */}
      <RoomSearch handleSearchResult={handleSearchResult} />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>⏳</div>
          <p className="room-detail-loading">Loading rooms…</p>
        </div>
      ) : (
        <>
          <RoomResult roomSearchResults={currentRooms} />
          <Pagination
            roomsPerPage={roomsPerPage}
            totalRooms={filteredRooms.length}
            currentPage={currentPage}
            paginate={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default AllRoomsPage;
