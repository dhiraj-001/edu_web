import React from 'react';

const Header = () => {
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 22px 16px 22px',
    height: '56px',
    backgroundColor: '#f9f9f9',
  };

  const logoStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    paddingLeft: '16px', // Added padding to move the logo slightly inside
  };

  const navContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '40px', // Increased space between navigation items
    fontWeight: '650',
    fontSize: '1.1rem',
  };

  const navItemStyle = {
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    color: '#31473a', // Set the color for nav items
  };

  const navItemHoverStyle = {
    color: '#31473a',
  };

  const loginBtnStyle = {
    padding: '8px 16px',
    backgroundColor: '#31473a',
    color: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  return (
    <header style={headerStyle}>
      {/* Left Side: Logo */}
      <div style={logoStyle}>
        <h1>MCQ.</h1>
      </div>

      {/* Right Side: Navigation and Login Button */}
      <div style={navContainerStyle}>
        <p
          style={navItemStyle}
          onMouseEnter={(e) => (e.target.style.color = navItemHoverStyle.color)}
          onMouseLeave={(e) => (e.target.style.color = '#31473a')}
        >
          Home
        </p>
        <p
          style={navItemStyle}
          onMouseEnter={(e) => (e.target.style.color = navItemHoverStyle.color)}
          onMouseLeave={(e) => (e.target.style.color = '#31473a')}
        >
          About
        </p>
        <p
          style={navItemStyle}
          onMouseEnter={(e) => (e.target.style.color = navItemHoverStyle.color)}
          onMouseLeave={(e) => (e.target.style.color = '#31473a')}
        >
          Event
        </p>
        <p
          style={navItemStyle}
          onMouseEnter={(e) => (e.target.style.color = navItemHoverStyle.color)}
          onMouseLeave={(e) => (e.target.style.color = '#31473a')}
        >
          Milestone
        </p>
        <p
          style={navItemStyle}
          onMouseEnter={(e) => (e.target.style.color = navItemHoverStyle.color)}
          onMouseLeave={(e) => (e.target.style.color = '#31473a')}
        >
          Course
        </p>
        <p style={loginBtnStyle}>Login</p>
      </div>
    </header>
  );
};

export default Header;
