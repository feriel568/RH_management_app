import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd'; 
import axios from 'axios';
import '../styles/Navbar.css'; 
import "antd/dist/reset.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch userId from localStorage (assuming it's stored after login)
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchNotifications(storedUserId); // Fetch notifications when userId is available
    }
  }, []);

  const fetchNotifications = async () => {
    try {
      const userId = localStorage.getItem('userId');

      const response = await axios.get(`http://localhost:4005/notification/${userId}`);
      response.data.forEach((notif) => {
        // Display each notification using Ant Design's notification component
        notification.open({
          message: notif.title,
          description: notif.message,
          placement: 'topRight',
          duration: 5, // The notification will last 5 seconds
        });
      });
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

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
