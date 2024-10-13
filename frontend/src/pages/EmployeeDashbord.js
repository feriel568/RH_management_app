import React from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate hook for navigation
import '../styles/Navbar.css'; // Optional: Include a CSS file for styling

const Navbar = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  const handleLogout = () => {
    // Clear the authentication token or any user-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); // Clear userId if stored

    // Redirect to the login page
    navigate('/'); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Employee Dashboard</div>
      <ul className="navbar-links">
        <li><a href="/conge">Demande congé</a></li>
        <li><a href="/resultaconge">Resultat congé</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/requests">Requests</a></li>
        <li><a href="/timesheet/create">TimeSheet</a></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
