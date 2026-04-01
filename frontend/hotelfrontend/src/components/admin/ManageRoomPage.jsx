import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';
import RoomResult from '../common/RoomResult';

const ManageRoomPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsRes, typesRes] = await Promise.all([
          ApiService.getAllRooms(),
          ApiService.getRoomTypes(),
        ]);
        setRooms(roomsRes.roomList);
        setFilteredRooms(roomsRes.roomList);
        setRoomTypes(typesRes);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRoomTypeChange = (e) => {
    const type = e.target.value;
    setSelectedRoomType(type);
    setFilteredRooms(type === '' ? rooms : rooms.filter(r => r.roomType === type));
    setCurrentPage(1);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfLastRoom - roomsPerPage, indexOfLastRoom);

  return (
    <div className="all-rooms">
      <div className="rooms-header">
        <div>
          <span className="section-label">Admin</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 300, marginBottom: 0 }}>
            All Rooms
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div className="all-room-filter-div">
            <label>Filter by type</label>
            <select value={selectedRoomType} onChange={handleRoomTypeChange}>
              <option value="">All</option>
              {roomTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <button
            className="add-room-button"
            onClick={() => navigate('/admin/add-room')}
          >
            + Add Room
          </button>
        </div>
      </div>

      {loading ? (
        <p className="room-detail-loading">Loading rooms…</p>
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

export default ManageRoomPage;