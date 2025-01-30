import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS
import axios from 'axios';
import '../CSS/Header.css';

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
        <h1>MCQ.</h1>
      </div>

      {/* Hamburger Menu for Small Screens */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <i className="fas fa-bars"></i>
      </div>

      {/* Desktop/Nav Links */}
      <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/event">Event</a>
        <a href="/milestone">Milestone</a>
        <a href="/course">Course</a>
        {isLoggedIn ? (
          <>
            <button>
              <a href="/userprofile">Profile</a>
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
            <a href="/login">Login</a>
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
