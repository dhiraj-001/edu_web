import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for proper navigation
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Container,
} from '@mui/material';
import '../CSS/Course.css'; // Import the CSS file

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://mc-qweb-backend.vercel.app/user/admin/course'
        ); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCourses(data); // Set the fetched data to state
      } catch (error) {
        setError(error.message); // Set error message if something goes wrong
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on component mount

  // Display loading or error messages
  if (loading) {
    return (
      <Container className="loading-container">
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="error-container">
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </Container>
    );
  }

  return (
    <Container className="course-container">
      <h1 variant="h4" align="center" className="title">
        Courses
      </h1>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item key={course._id} xs={12} sm={6} md={4}>
            <Card className="course-card">
              <CardContent className="card-content">
                <Typography
                  variant="h5"
                  component="div"
                  className="course-name"
                >
                  <Link
                    to={`/coursequation/${course._id}`}
                    className="course-link"
                  >
                    {course.name}
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Course;
