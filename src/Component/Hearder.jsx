import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS
import axios from 'axios';
import '../CSS/Header.css';

import { Link, NavLink } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await axios.post(
        'https://mc-qweb-backend.vercel.app/user/verify-token',
        { token }
      );
      setIsLoggedIn(response.data.valid);
    } catch (err) {
      console.error('Token verification failed:', err);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove('auth_token');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="header">
      <div className="logo">
        <a href='/'>  <h1>MCQ.</h1></a>
      </div>

      {/* Hamburger Menu for Small Screens */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <i className="fas fa-bars"></i>
      </div>

      {/* Desktop/Nav Links */}
      <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
      <Dropdown className='dropdown '>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
       Courses
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">SSC</Dropdown.Item>
        <Dropdown.Item href="#/action-2">ADRE</Dropdown.Item>
        <Dropdown.Item href="#/action-3">APSC</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/About">About</NavLink>
        <NavLink to="/Event">Event</NavLink>
      
        {isLoggedIn ? (
          <>
            <button>
              <NavLink to="/userprofile">Profile</NavLink>
            </button>
            <button>
              <p
                onClick={handleLogout}
                className="logout-btn"
                style={{
                  color: 'white',
                  textdecoration: 'none',
                  fontWeight: 'bolder',
                  transition: 'color 0.3s ease',
                }}
              >
                Logout
              </p>
            </button>
          </>
        ) : (
          <button>
            <NavLink to="/login">Login</NavLink>
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
