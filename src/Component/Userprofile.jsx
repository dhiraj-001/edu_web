import React from 'react';
import '../CSS/Userprofile.css';
import Header from './Hearder';
import Footer from './Footer';
import Course from './Course';

const Userprofile = () => {
  return (
    <>
      <Header />
      <div className="dashboard-container">
        <div className="content1">
          <div className="profile-section">
            <div className="profile-pic"></div>
            <div>
              <h3>User Name</h3>
            </div>
            <div>
              <p>username@email.com</p>
            </div>
            <div>
              <button className="edit-profile">Edit Your Profile</button>
            </div>
          </div>

          <div className="account-info">
            <h2>About Your Account</h2>
            <div className="stats">
              <div className="stat-box">
                Total Question Attempt <br></br>
                <span>500</span>
              </div>
              <div className="stat-box">
                Total Questions Right <br></br>
                <span>500</span>
              </div>
              <div className="stat-box">
                Average<br></br> <span>500</span>
              </div>
              <div className="stat-box">
                Total Events Attempted <br></br>
                <span>500</span>
              </div>
              <div className="stat-box">
                Highest Questions Solved in a Day <br></br>
                <span>500</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Course />
      <Footer />
    </>
  );
};

export default Userprofile;
