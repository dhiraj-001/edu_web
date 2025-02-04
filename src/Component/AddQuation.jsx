import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Divider } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const AddSubjectPage = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const { courseId, subjectId, cosubjectId, course, subject, cosubject } =
    useParams();
  const navigate = useNavigate();

  useEffect(() => {
    verifyToken();
    fetchSavedQuestions();
  }, []);

  const verifyToken = async () => {
    console.log('courseId:', courseId);
    const token = Cookies.get('admin_token');
    if (!token) {
      setIsTokenValid(false);
      navigate('/');
      return;
    }

    try {
      const response = await axios.post(
        'https://mc-qweb-backend.vercel.app/user/verify-tokenadmin',
        { token }
      );
      if (!response.data.valid) {
        setIsTokenValid(false);
        navigate('/');
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      setIsTokenValid(false);
      navigate('/');
    }
  };

  const fetchSavedQuestions = () => {
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    setSavedQuestions(storedQuestions);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddQuestion = () => {
    if (
      question.trim() &&
      options.every((opt) => opt.trim()) &&
      answer.trim()
    ) {
      const newQuestion = { question, options, answer };
      const updatedQuestions = [...savedQuestions, newQuestion];

      localStorage.setItem('questions', JSON.stringify(updatedQuestions));
      setSavedQuestions(updatedQuestions);

      setQuestion('');
      setOptions(['', '', '', '']);
      setAnswer('');
    }
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = savedQuestions.filter((_, i) => i !== index);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    setSavedQuestions(updatedQuestions);
  };

  const handleFinalSubmit = async () => {
    try {
      const formattedQuestions = savedQuestions.map((q) => ({
        question: q.question,
        options: q.options,
        correctOption: q.answer, // Make sure this matches the backend schema
      }));

      console.log('Sending Data:', formattedQuestions);

      await axios.post(
        `https://mc-qweb-backend.vercel.app/user/admin/addquestion/${courseId}/${subjectId}/${cosubjectId}`,
        { questions: formattedQuestions },
        { headers: { 'Content-Type': 'application/json' } }
      );

      localStorage.removeItem('questions');
      setSavedQuestions([]);
      alert('Questions saved successfully!');
    } catch (error) {
      console.error('Error saving questions:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
      {isTokenValid && (
        <div>
          <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>
            Add Questions in {course} / {subject} / {cosubject}
          </Typography>
          <Divider sx={{ margin: '16px 0' }} />

          {/* Input Fields */}
          <TextField
            label="Question"
            variant="outlined"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            sx={{ marginBottom: '16px' }}
          />

          {[0, 1, 2, 3].map((index) => (
            <TextField
              key={index}
              label={`Option ${index + 1}`}
              variant="outlined"
              value={options[index]}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              sx={{ marginBottom: '8px' }}
            />
          ))}

          <TextField
            label="Correct Answer"
            variant="outlined"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            sx={{ marginBottom: '16px' }}
          />

          <Button
            variant="contained"
            onClick={handleAddQuestion}
            sx={{ marginBottom: '16px' }}
          >
            Add to Local Storage
          </Button>

          {/* Display Saved Questions */}
          <Typography variant="h5">Saved Questions</Typography>
          {savedQuestions.length > 0 ? (
            savedQuestions.map((q, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '8px',
                  marginBottom: '8px',
                }}
              >
                <Typography>
                  <strong>Q:</strong> {q.question}
                </Typography>
                {q.options.map((opt, i) => (
                  <Typography key={i}>• {opt}</Typography>
                ))}
                <Typography>
                  <strong>Answer:</strong> {q.answer}
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteQuestion(index)}
                  sx={{ marginTop: '8px' }}
                >
                  Delete
                </Button>
              </Box>
            ))
          ) : (
            <Typography>No questions saved yet.</Typography>
          )}

          {/* Final Submit */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleFinalSubmit}
            sx={{ marginTop: '16px' }}
          >
            Final Submit (Save to Database)
          </Button>
        </div>
      )}

      {!isTokenValid && (
        <Typography variant="body1" color="error">
          Invalid or expired token. Redirecting to home...
        </Typography>
      )}
    </Box>
  );
};

export default AddSubjectPage;
