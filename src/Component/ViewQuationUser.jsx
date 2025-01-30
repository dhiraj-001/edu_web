import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';

const ViewQuestionUser = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  console.log('Received categoryId:', categoryId); // Debugging

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('User is not logged in. Redirecting to login page...');
      navigate('/login', { replace: true });
      return;
    }

    // Verify token first
    const verifyToken = async () => {
      try {
        const response = await fetch(
          'https://mc-qweb-backend.vercel.app/user/verify-token',
          {
            method: 'POST', // Assuming POST for token verification
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();
        if (!response.ok || !data.valid) {
          console.warn('Invalid token. Redirecting to login...');
          navigate('/login', { replace: true });
          return;
        }

        // If token is valid, fetch questions
        fetchQuestions();
      } catch (error) {
        console.error('Error verifying token:', error);
        setError('Error verifying token.');
        setLoading(false);
      }
    };

    // Fetch questions after token verification
    const fetchQuestions = async () => {
      try {
        console.log(
          'Fetching from:',
          `https://mc-qweb-backend.vercel.app/user/course/${categoryId}`
        );
        const response = await fetch(
          `https://mc-qweb-backend.vercel.app/user/course/${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error('Failed to fetch questions');

        const data = await response.json();
        console.log('Fetched questions:', data);
        setQuestions(data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    verifyToken(); // Verify token on component mount
  }, [categoryId, navigate]);

  if (loading) {
    return (
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ textAlign: 'center', padding: '20px' }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Retry
        </button>
      </Container>
    );
  }

  return (
    <Container style={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Questions
      </Typography>
      <Grid container spacing={3}>
        {questions.map((question) => (
          <Grid item key={question._id} xs={12} sm={6} md={4}>
            <Card
              style={{
                backgroundColor: '#f5f5f5',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <CardContent>
                <Typography variant="h6">{question.question}</Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ marginTop: '10px' }}
                >
                  <strong>Options:</strong>
                </Typography>
                <ul style={{ paddingLeft: '20px', margin: '5px 0' }}>
                  {question.options.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
                <Typography variant="body2" color="textSecondary">
                  <strong>Correct Option:</strong> {question.correctOption}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ViewQuestionUser;
