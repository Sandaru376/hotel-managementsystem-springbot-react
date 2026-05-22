import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

function Navbar() {
  const isAuthenticated = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();
  const isUser = ApiService.isUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    const isLogout = window.confirm('Are you sure you want to logout?');
    if (isLogout) {
      ApiService.logout();
      navigate('/home');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/home">Hotel</NavLink>
      </div>
      <ul className="navbar-ul">
        <li><NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
        <li><NavLink to="/rooms" className={({ isActive }) => isActive ? 'active' : ''}>Rooms</NavLink></li>
        <li><NavLink to="/find-booking" className={({ isActive }) => isActive ? 'active' : ''}>Find Booking</NavLink></li>

        {isUser && (
          <li><NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>My Profile</NavLink></li>
        )}
        {isAdmin && (
          <li><NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>Admin</NavLink></li>
        )}

        {!isAuthenticated && (
          <li><NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Sign In</NavLink></li>
        )}
        {!isAuthenticated && (
          <li>
            <NavLink to="/register" className="nav-cta">
              Register
            </NavLink>
          </li>
        )}
        {isAuthenticated && (
          <li className="logout-item" onClick={handleLogout}>Sign Out</li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;