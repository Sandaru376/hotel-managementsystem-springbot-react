import React from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const RoomResult = ({ roomSearchResults }) => {
  const navigate = useNavigate();
  const isAdmin = ApiService.isAdmin();

  if (!roomSearchResults || roomSearchResults.length === 0) return null;

  return (
    <section className="room-results">
      <div className="room-list">
        {roomSearchResults.map((room, index) => (
          <div
            key={room.id}
            className="room-list-item"
            style={{ animationDelay: `${index * 0.06}s` }}
          >
            <img
              className="room-list-item-image"
              src={room.roomPhotoUrl}
              alt={room.roomType}
            />
            <div className="room-details">
              <h3>{room.roomType}</h3>
              <p className="price-tag">
                ${room.roomPrice} <span>/ night</span>
              </p>
              <p>{room.roomDescription}</p>
            </div>
            <div className="book-now-div">
              {isAdmin ? (
                <button
                  className="edit-room-button"
                  onClick={() => navigate(`/admin/edit-room/${room.id}`)}
                >
                  Edit Room
                </button>
              ) : (
                <button
                  className="book-now-button"
                  onClick={() => navigate(`/room-details-book/${room.id}`)}
                >
                  View & Book
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoomResult;