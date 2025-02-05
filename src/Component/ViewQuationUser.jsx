import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
} from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';

const ViewQuestionUser = () => {
  const { courseId, subjectId, cosubjectId } = useParams();
  const navigate = useNavigate();
  // console.log('Received categoryId:', categoryId);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Stores user-selected answers

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (!token) {
      console.warn('User is not logged in. Redirecting to login page...');
      navigate('/login', { replace: true });
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await axios.post(
          'https://mc-qweb-backend.vercel.app/user/verify-token',
          { token }
        );

        if (!response.data.valid) {
          console.warn('Invalid token. Redirecting to login...');
          navigate('/login', { replace: true });
          return;
        }

        fetchQuestions();
      } catch (error) {
        console.error('Error verifying token:', error);
        setError('Error verifying token.');
        setLoading(false);
      }
    };

    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://mc-qweb-backend.vercel.app/user/admin/quations/${courseId}/${subjectId}/${cosubjectId}`
        );
    
        if (response.status !== 200) throw new Error('Failed to fetch questions');
    
        // console.log('Fetched questions:', response.data);
    
        // Check if questions exist
        const fetchedQuestions = response.data.quations || [];  // Use empty array as fallback
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    

    verifyToken();
  }, [courseId, navigate]);

  const handleAnswerSelection = (questionId, selectedOption, correctOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: {
        selected: selectedOption,
        isCorrect: selectedOption === correctOption,
      },
    }));
  };

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
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
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
                {question.options.map((option, index) => {
                  const isSelected =
                    selectedAnswers[question._id]?.selected === option;
                  const isCorrect = selectedAnswers[question._id]?.isCorrect;
                  return (
                    <Button
                      key={index}
                      variant="contained"
                      style={{
                        display: 'block',
                        margin: '8px 0',
                        width: '100%',
                        textAlign: 'left',
                        backgroundColor: isSelected
                          ? isCorrect
                            ? '#4CAF50' // Green for correct
                            : '#F44336' // Red for incorrect
                          : '#ffffff',
                        color: isSelected ? 'white' : 'black',
                        border: '1px solid #ccc',
                        cursor: selectedAnswers[question._id]
                          ? 'default'
                          : 'pointer',
                      }}
                      disabled={!!selectedAnswers[question._id]}
                      onClick={() =>
                        handleAnswerSelection(
                          question._id,
                          option,
                          question.correctOption
                        )
                      }
                    >
                      {option}
                    </Button>
                  );
                })}
                {selectedAnswers[question._id] && (
                  <Typography
                    variant="body2"
                    style={{
                      marginTop: '10px',
                      color: selectedAnswers[question._id].isCorrect
                        ? 'green'
                        : 'red',
                    }}
                  >
                    {selectedAnswers[question._id].isCorrect
                      ? 'Correct Answer! ✅'
                      : `Wrong! ❌ Correct: ${question.correctOption}`}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ViewQuestionUser;
