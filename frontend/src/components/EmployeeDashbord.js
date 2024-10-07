import React from 'react';
import '../styles/Navbar.css'; // Optional: Include a CSS file for styling

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <div className="navbar-logo">Employee Dashboard</div>
        <ul className="navbar-links">
          <li><a href="/conge">conge</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/requests">Requests</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
