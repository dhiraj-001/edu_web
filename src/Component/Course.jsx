import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Container,
} from '@mui/material';

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
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Display loading or error messages
  if (loading) {
    return (
      <Container style={styles.loadingContainer}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={styles.errorContainer}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
        <button
          style={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </Container>
    );
  }

  return (
    <Container style={styles.courseContainer}>
      <h1 style={styles.title}>Courses</h1>

      {/* Centering the course list properly */}
      <Grid container spacing={3} style={styles.centerGrid}>
        {courses.map((course) => (
          <Grid
            item
            key={course._id}
            xs={12}
            sm={6}
            md={4}
            style={styles.centerGridItem}
          >
            <Card style={styles.courseCard}>
              <CardContent style={styles.cardContent}>
                {/* Course Image */}
                <img
                  src={`/src/ImageCourse/${course.image}`}
                  height={100}
                  width={100}
                  alt={course.name}
                  style={styles.courseImage}
                />
                {/* Course Name */}
                <Typography
                  variant="h5"
                  component="div"
                  style={styles.courseName}
                >
                  <Link
                    to={`/viewsubject/${course._id}`}
                    style={styles.courseLink}
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

// Inline Styles
const styles = {
  courseContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Centers the whole course section
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
  title: {
    marginBottom: 20,
  },
  centerGrid: {
    display: 'flex',
    justifyContent: 'center', // Centers the entire grid
  },
  centerGridItem: {
    display: 'flex',
    justifyContent: 'center', // Centers individual grid items
  },
  courseCard: {
    width: 200, // Fixed width to keep it centered
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    transition: 'transform 0.2s ease-in-out',
    padding: 10,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  courseImage: {
    width: '100%', // Full width of the card
    height: 120, // Fixed height
    objectFit: 'cover', // Ensures the image fits well
    borderRadius: 5, // Rounded corners for the image
    marginBottom: 10, // Space between image and text
  },
  courseName: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  courseLink: {
    textDecoration: 'none',
    color: '#333',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  errorContainer: {
    textAlign: 'center',
    marginTop: 50,
  },
  retryButton: {
    marginTop: 10,
    padding: '10px 15px',
    backgroundColor: '#d32f2f',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Course;
