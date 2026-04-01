import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const AddRoomPage = () => {
  const navigate = useNavigate();
  const [roomDetails, setRoomDetails] = useState({ roomType: '', roomPrice: '', roomDescription: '' });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [roomTypes, setRoomTypes] = useState([]);
  const [newRoomType, setNewRoomType] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ApiService.getRoomTypes()
      .then(types => setRoomTypes(types))
      .catch(err => console.error('Error fetching room types:', err.message));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleRoomTypeChange = (e) => {
    const value = e.target.value;
    setSelectedRoomType(value);
    if (value === 'new') {
      setNewRoomType(true);
      setRoomDetails(prev => ({ ...prev, roomType: '' }));
    } else {
      setNewRoomType(false);
      setRoomDetails(prev => ({ ...prev, roomType: value }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  const addRoom = async () => {
    if (!roomDetails.roomType || !roomDetails.roomPrice || !roomDetails.roomDescription) {
      setError('All room details must be provided.');
      setTimeout(() => setError(''), 5000);
      return;
    }
    if (!window.confirm('Add this room?')) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('roomType', roomDetails.roomType);
      formData.append('roomPrice', roomDetails.roomPrice);
      formData.append('roomDescription', roomDetails.roomDescription);
      if (file) formData.append('photo', file);

      const result = await ApiService.addRoom(formData);
      if (result.statusCode === 200) {
        setSuccess('Room added successfully.');
        setTimeout(() => { setSuccess(''); navigate('/admin/manage-rooms'); }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-room-container">
      <h2>Add New Room</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <div className="edit-room-form">
        <div className="form-group">
          {preview && <img src={preview} alt="Preview" className="room-photo-preview" />}
          <label>Room Photo</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <div className="form-group">
          <label>Room Type</label>
          <select value={selectedRoomType} onChange={handleRoomTypeChange}>
            <option value="">Select a room type</option>
            {roomTypes.map(type => <option key={type} value={type}>{type}</option>)}
            <option value="new">Other (specify below)</option>
          </select>
          {newRoomType && (
            <input
              type="text"
              name="roomType"
              placeholder="Enter custom room type"
              value={roomDetails.roomType}
              onChange={handleChange}
              style={{ marginTop: 12 }}
            />
          )}
        </div>

        <div className="form-group">
          <label>Room Price (per night)</label>
          <input
            type="number"
            name="roomPrice"
            value={roomDetails.roomPrice}
            onChange={handleChange}
            placeholder="e.g. 250"
          />
        </div>

        <div className="form-group">
          <label>Room Description</label>
          <textarea
            name="roomDescription"
            value={roomDetails.roomDescription}
            onChange={handleChange}
            placeholder="Describe the room, its features and what guests can expect…"
          />
        </div>

        <button
          className="update-button"
          onClick={addRoom}
          disabled={loading}
          style={{ width: '100%', margin: '16px 0 0' }}
        >
          {loading ? 'Adding Room…' : 'Add Room'}
        </button>
        <button
          className="delete-button"
          onClick={() => navigate('/admin/manage-rooms')}
          style={{ width: '100%', margin: '12px 0 0' }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddRoomPage;