import React, { useState, useEffect } from 'react';

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
      <div style={styles.loadingContainer}>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <div>Error: {error}</div>
        <button
          style={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={styles.courseContainer}>
      <h1 style={styles.title}>Courses</h1>

      {/* Centering the course list properly */}
      <div style={styles.centerGrid}>
        {courses.map((course) => (
          <div key={course._id} style={styles.centerGridItem}>
            <a href={course.name === 'SSC' ? '/SSC' : '/ADRE'} style={styles.courseCard}>
              <div style={styles.cardContent}>
                {/* Course Image */}
                <img
                  src={`/src/ImageCourse/${course.image}`}
                  height={'35%'}
                  width={'20%'}
                  alt={course.name}
                  style={styles.courseImage}
                />
                {/* Course Name */}
                <div style={styles.courseName}>
                  {course.name}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
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
    flexWrap: 'wrap',
  },
  centerGridItem: {
    display: 'flex',
    justifyContent: 'center', // Centers individual grid items
    margin: '10px',
  },
  courseCard: {
    width: 150, // Fixed width to keep it centered
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    transition: 'transform 0.2s ease-in-out',
    padding: 10,
    textDecoration: 'none',
    color: 'black',
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
