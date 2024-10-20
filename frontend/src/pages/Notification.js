import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { notification } from 'antd'; // Import notification from Ant Design
import 'antd/dist/antd.css'; // Import Ant Design styles

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  // Function to open the Ant Design notification
  const openNotification = (title, message) => {
    notification.open({
      message: title,
      description: message,
      placement: 'topRight',
      duration: 5, // The notification will last 5 seconds
    });
  };

  useEffect(() => {
    const fetchNotifications = async () => {
        const userId = localStorage.getItem('id');
      try {
        const response = await axios.get(`http://localhost:4005/notification${userId}`);
        setNotifications(response.data);

        // Trigger a notification for each new notification fetched
        response.data.forEach((notif) => {
          openNotification(notif.title, notif.message);
        });
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [userId]);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            <strong>{notification.title}</strong>: {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
