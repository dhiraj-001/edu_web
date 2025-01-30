import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Component/Signup';
import Header from './Component/Hearder';
import Event from './Component/Event';
import Login from './Component/Login';
import Home from './Component/Home';
import Footer from './Component/Footer';
import Milestone from './Component/Milestone';
import AdminLogin from './Component/AdminLogin';
import Admin from './Component/Admin';
import Userprofile from './Component/Userprofile';
import Addquation from './Component/AddQuation';
import Course from './Component/Course';
import Viewquationuser from './Component/ViewQuationUser';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<Event />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/milestone" element={<Milestone />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/userprofile" element={<Userprofile />} />
          <Route path="/addquestionpage/:id" element={<Addquation />} />
          <Route path="/course" element={<Course />} />
          <Route
            path="/coursequation/:categoryId"
            element={<Viewquationuser />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
