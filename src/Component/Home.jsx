import React from 'react';
import '../CSS/Home.css';
import benner from '../view/benner.jpg';
import Event from './Event';
import Milestone from './Milestone';
import Footer from './Footer';
import Header from './Hearder';
import Course from './Course';

const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="container">
        <div className="content">
          <h1>Explore <i>Multiple Choice Questions</i></h1>
          <h1>With Us.</h1>
          <p>
            MCQweb is an interactive online platform that enhances learning
            through multiple-choice quizzes across various subjects. It offers
            instant feedback, progress tracking, and an engaging experience for
            students and professionals. Whether preparing for exams or improving
            knowledge, MCQweb makes learning fun and effective. Start your
            journey today!
          </p>
          <button className="button">Try it now</button>
        </div>
        <div className="image-container">
          <img src={benner} />
        </div>
      </div>
      
      <Event />
      <Course />
      <Footer />
    </>
  );
};

export default Home;
