import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const AddRoomPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roomType: '',
    roomPrice: '',
    roomDescription: '',
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const roomTypes = [
    'Single', 'Double', 'Suite', 'Deluxe', 'Penthouse',
    'Family', 'Twin', 'Studio', 'Presidential Suite','luxury'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!photo) return setError('Please upload a room photo.');
    if (!formData.roomType) return setError('Please select a room type.');
    if (!formData.roomPrice || isNaN(formData.roomPrice) || Number(formData.roomPrice) <= 0)
      return setError('Please enter a valid room price.');

    const data = new FormData();
    data.append('photo', photo);
    data.append('roomType', formData.roomType);
    data.append('roomPrice', formData.roomPrice);
    data.append('roomDescription', formData.roomDescription);

    try {
      setLoading(true);
      const response = await ApiService.addRoom(data);
      if (response.statusCode === 200) {
        setSuccess('✅ Room added successfully! Redirecting…');
        setTimeout(() => navigate('/admin/manage-rooms'), 2000);
      } else {
        setError(response.message || 'Failed to add room.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-room-page" style={{ maxWidth: 720, margin: '60px auto', padding: '0 24px 80px' }}>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <span className="section-label">Admin Panel</span>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 48, fontWeight: 300,
          margin: '8px 0 6px', lineHeight: 1.1
        }}>
          Add New <em>Room</em>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
          Fill in the details below to list a new room.
        </p>
      </div>

      {/* Alerts */}
      {error   && <p className="error-message"   style={{ marginBottom: 20 }}>{error}</p>}
      {success && <p className="success-message" style={{ marginBottom: 20 }}>{success}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

        {/* Photo Upload */}
        <div>
          <label style={labelStyle}>Room Photo *</label>
          <div
            onClick={() => document.getElementById('room-photo-input').click()}
            style={{
              border: '2px dashed var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '28px 20px',
              textAlign: 'center',
              cursor: 'pointer',
              background: photoPreview ? 'transparent' : 'var(--bg-soft)',
              transition: 'border-color 0.2s',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {photoPreview ? (
              <>
                <img
                  src={photoPreview}
                  alt="Preview"
                  style={{
                    width: '100%', maxHeight: 260,
                    objectFit: 'cover', borderRadius: 'var(--radius-sm)',
                    display: 'block',
                  }}
                />
                <p style={{ marginTop: 10, fontSize: 13, color: 'var(--text-muted)' }}>
                  Click to change photo
                </p>
              </>
            ) : (
              <>
                <div style={{ fontSize: 36, marginBottom: 8 }}>📷</div>
                <p style={{ fontWeight: 600, marginBottom: 4 }}>Click to upload a photo</p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  JPG, PNG or WEBP — max 10 MB
                </p>
              </>
            )}
          </div>
          <input
            id="room-photo-input"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* Room Type */}
        <div>
          <label style={labelStyle} htmlFor="roomType">Room Type *</label>
          <select
            id="roomType"
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select a room type…</option>
            {roomTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label style={labelStyle} htmlFor="roomPrice">Price per Night (USD) *</label>
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute', left: 14, top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)', fontWeight: 600, fontSize: 15,
            }}>$</span>
            <input
              id="roomPrice"
              name="roomPrice"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={formData.roomPrice}
              onChange={handleChange}
              style={{ ...inputStyle, paddingLeft: 30 }}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label style={labelStyle} htmlFor="roomDescription">Room Description</label>
          <textarea
            id="roomDescription"
            name="roomDescription"
            rows={4}
            placeholder="Describe the room's features, view, amenities…"
            value={formData.roomDescription}
            onChange={handleChange}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
          />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              flex: 1,
              background: 'var(--terra)',
              color: '#fff',
              border: 'none',
              borderRadius: 999,
              padding: '15px 32px',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              boxShadow: '0 6px 20px rgba(196,98,45,0.28)',
              transition: 'all 0.2s',
            }}
          >
            {loading ? 'Adding Room…' : '+ Add Room'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/manage-rooms')}
            style={{
              background: 'transparent',
              border: '1.5px solid var(--border)',
              borderRadius: 999,
              padding: '15px 32px',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              transition: 'all 0.2s',
            }}
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

const labelStyle = {
  display: 'block',
  marginBottom: 8,
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: 'var(--ink, #2c2c2c)',
};

const inputStyle = {
  width: '100%',
  padding: '13px 14px',
  fontSize: 15,
  border: '1.5px solid var(--border)',
  borderRadius: 'var(--radius-sm)',
  background: 'var(--bg-soft, #faf9f7)',
  color: 'var(--ink, #2c2c2c)',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  transition: 'border-color 0.18s',
};

export default AddRoomPage;