import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Component/Signup';
import About from './Component/About';
import Header from './Component/Hearder';
import SSC from './Component/SSC';
import ADRE from './Component/ADRE';
import APSC from './Component/APSC';

import Event from './Component/Event';
import Login from './Component/Login';
import Home from './Component/Home';
import Footer from './Component/Footer';
import Milestone from './Component/Milestone';
import AdminLogin from './Component/AdminLogin';
import Admin from './Component/Admin';
import Userprofile from './Component/Userprofile';
import Addquation from './Component/AddQuation';
import QuizPage from './Component/QuizPage';
import Course from './Component/Course';
import Viewquationuser from './Component/ViewQuationUser';
import Addsubject from './Component/AddSubject';
import AddCoSubject from './Component/Addcosubject';
import ViewSubjectPage from './Component/ViewSubject';
import ViewCoSubject from './Component/ViewCosubject';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<Event />} />
          <Route path="/SSC" element={<SSC />} />
          <Route path="/ADRE" element={<ADRE />} />
          <Route path="/APSC" element={<APSC />} />
          <Route path="/addqsn" element={<addqsn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          
          <Route path="/milestone" element={<Milestone />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/QuizPage" element={<QuizPage />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/userprofile" element={<Userprofile />} />
          <Route
            path="/:course/:subject/:cosubject/quations/:courseId/:subjectId/:cosubjectId"
            element={<Addquation />}
          />
          <Route path="/course" element={<Course />} />
          <Route
            path="/:course/addsubject/:courseId"
            element={<Addsubject />}
          />
          <Route
            path="/:course/:subject/cosubject/:courseId/:subjectId"
            element={<AddCoSubject />}
          />
          <Route
            path="/coursequation/:courseId/:subjectId/:cosubjectId"
            element={<Viewquationuser />}
          />
          <Route path="/viewsubject/:courseId" element={<ViewSubjectPage />} />
          <Route
            path="/viewcosubject/:courseId/:subjectId"
            element={<ViewCoSubject />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
