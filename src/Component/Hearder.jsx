import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS
import axios from 'axios';

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
    <header
      style={{
        backgroundColor: '#f9f9f9',
        padding: '16px 22px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '56px',
      }}
    >
      <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
        <h1>MCQ.</h1>
      </div>

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ cursor: 'pointer', fontSize: '1.5rem' }}
      >
        <i className="fas fa-bars"></i>
      </div>

      {menuOpen && (
        <div
          className="dropdown-menu"
          style={{
            position: 'absolute',
            top: '60px',
            right: '20px',
            backgroundColor: 'white',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '10px',
            zIndex: '1000',
          }}
        >
          <p>
            <a href="/">Home</a>
          </p>
          <p>
            <a href="/about">About</a>
          </p>
          <p>
            <a href="/event">Event</a>
          </p>
          <p>
            <a href="/milestone">Milestone</a>
          </p>
          <p>
            <a href="/course">Course</a>
          </p>
          {isLoggedIn ? (
            <>
              <p>
                <a href="/userprofile">
                  <i className="fas fa-user-circle"></i> Profile
                </a>
              </p>
              <p onClick={handleLogout} style={{ cursor: 'pointer' }}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </p>
            </>
          ) : (
            <p>
              <a href="/login">
                <i className="fas fa-sign-in-alt"></i> Login
              </a>
            </p>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
