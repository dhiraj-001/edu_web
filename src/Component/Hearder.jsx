import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS
import { colors } from '@mui/material';
import axios from 'axios'; // For token verification

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const token = Cookies.get('auth_token'); // Get the token from cookies

    if (token) {
      // If token exists, verify its validity
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      // Make a request to the backend to verify the token (you should have an endpoint for this)
      const response = await axios.post(
        'https://mc-qweb-backend.vercel.app/user/verify-token',
        {
          token,
        }
      );

      if (response.data.valid) {
        setIsLoggedIn(true); // Set the user as logged in if token is valid
      } else {
        setIsLoggedIn(false); // If token is invalid, set logged out state
      }
    } catch (err) {
      console.error('Token verification failed:', err);
      setIsLoggedIn(false); // Set to logged out if verification fails
    } finally {
      setLoading(false); // Stop loading after the token verification process
    }
  };

  const handleLogout = () => {
    Cookies.remove('auth_token'); // Remove token from cookies
    setIsLoggedIn(false); // Update state to logged out
    window.location.href = '/'; // Or use react-router for navigation
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 22px',
    height: '56px',
    backgroundColor: '#f9f9f9',
  };

  const logoStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    paddingLeft: '16px',
  };

  const navContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
    fontWeight: '650',
    fontSize: '1.1rem',
  };

  const navItemStyle = {
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    color: '#31473a',
  };

  const navItemHoverStyle = {
    color: '#31473a',
  };

  const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: '#31473a',
    color: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const colorchange = {
    color: 'white',
  };

  if (loading) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <header style={headerStyle}>
      {/* Left Side: Logo */}
      <div style={logoStyle}>
        <h1>MCQ.</h1>
      </div>

      {/* Right Side: Navigation and Login/Profile Button */}
      <div style={navContainerStyle}>
        <p style={navItemStyle}>
          <a href="/">Home</a>
        </p>
        <p style={navItemStyle}>
          <a href="/about">About</a>
        </p>
        <p style={navItemStyle}>
          <a href="/event">Event</a>
        </p>
        <p style={navItemStyle}>
          <a href="/milestone">Milestone</a>
        </p>
        <p style={navItemStyle}>
          <a href="/course">Course</a>
        </p>

        {/* Change button based on login state */}
        {isLoggedIn ? (
          <>
            <p style={buttonStyle}>
              <a href="/userprofile" style={colorchange}>
                <i
                  className="fas fa-user-circle"
                  style={{ marginRight: '8px' }}
                ></i>{' '}
                Profile
              </a>
            </p>
            <p style={buttonStyle} onClick={handleLogout}>
              <a href="#" style={colorchange}>
                <i
                  className="fas fa-sign-out-alt"
                  style={{ marginRight: '8px' }}
                ></i>{' '}
                Logout
              </a>
            </p>
          </>
        ) : (
          <p style={buttonStyle}>
            <a href="/login" style={colorchange}>
              Login
            </a>
          </p>
        )}
      </div>
    </header>
  );
};

export default Header;
