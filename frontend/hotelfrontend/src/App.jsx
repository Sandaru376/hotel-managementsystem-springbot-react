import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './components/home/HomePage';
import FooterComponent from './components/common/Footer';
import RoomDetailsPage from './components/booking_rooms/RoomDetailsPage';
import AllRoomsPage from './components/booking_rooms/AllRoomsPage';
import FindBookingPage from './components/booking_rooms/FindBookingPage';
import RegisterPage from './components/auth/RegisterPage';
import LoginPage from './components/auth/LoginPage';
import ProfilePage from './components/profile/ProfilePage';
import EditProfilePage from './components/profile/EditProfilePage';
import AdminPage from './components/admin/AdminPage';
import ManageRoomPage from './components/admin/ManageRoomPage';
import EditRoomPage from './components/admin/EditRoomPage';
import AddRoomPage from './components/admin/AddRoomPage';
import ManageBookingsPage from './components/admin/ManageBookingsPage';
import EditBookingPage from './components/admin/EditBookingPage';
import { ProtectedRoute, AdminRoute } from './service/guard';

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <div className='content'>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/rooms" element={<AllRoomsPage />} />
            <Route path="/find-booking" element={<FindBookingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/room-details-book/:roomId"
              element={<ProtectedRoute element={<RoomDetailsPage />} />}
            />
            <Route path="/profile"
              element={<ProtectedRoute element={<ProfilePage />} />}
            />
            <Route path="/edit-profile"
              element={<ProtectedRoute element={<EditProfilePage />} />}
            />

            {/* Admin Routes */}
            <Route path="/admin"
              element={<AdminRoute element={<AdminPage />} />}
            />
            <Route path="/admin/manage-rooms"
              element={<AdminRoute element={<ManageRoomPage />} />}
            />
            <Route path="/admin/edit-room/:roomId"
              element={<AdminRoute element={<EditRoomPage />} />}
            />
            <Route path="/admin/add-room"
              element={<AdminRoute element={<AddRoomPage />} />}
            />
            <Route path="/admin/manage-bookings"
              element={<AdminRoute element={<ManageBookingsPage />} />}
            />
            <Route path="/admin/edit-booking/:bookingCode"
              element={<AdminRoute element={<EditBookingPage />} />}
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
};

export default App;