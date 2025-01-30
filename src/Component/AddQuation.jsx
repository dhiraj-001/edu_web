import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  TableContainer,
  Paper,
} from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from 'js-cookie'; // Import js-cookie for token handling

const AddQuestion = () => {
  const { id } = useParams(); // Get course ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctOption: '',
  });
  const [message, setMessage] = useState('');
  const [questions, setQuestions] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    verifyToken();
  }, []);

  useEffect(() => {
    if (isTokenValid) {
      fetchCourseData();
    }
  }, [isTokenValid]);

  // Check if the admin token is valid
  const verifyToken = async () => {
    const token = Cookies.get('admin_token');
    if (!token) {
      setIsTokenValid(false);
      navigate('/'); // Redirect to home if no token
      return;
    }

    try {
      const response = await axios.post(
        'https://mc-qweb-backend.vercel.app/user/verify-tokenadmin',
        { token }
      );

      if (response.data.valid) {
        setIsTokenValid(true); // Valid token
      } else {
        setIsTokenValid(false);
        navigate('/'); // Redirect to home if token is invalid
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      setIsTokenValid(false);
      navigate('/'); // Redirect to home on error
    }
  };

  // Fetch course data and existing questions if the token is valid
  const fetchCourseData = async () => {
    try {
      const response = await axios.get(
        `https://mc-qweb-backend.vercel.app/user/course/${id}`
      );
      setSubjectName(response.data.name); // Assuming the course object contains the name
      setQuestions(response.data.questions); // Assuming course data includes questions array
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  };

  // Handle input changes for the question and options
  const handleInputChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData({ ...formData, options: updatedOptions });
  };

  // Submit question to the API
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { question, options, correctOption } = formData;

    if (!question || options.some((opt) => !opt) || !correctOption) {
      setMessage('Please fill all fields.');
      return;
    }

    try {
      const response = await axios.post(
        `https://mc-qweb-backend.vercel.app/user/course/${id}/add-question`,
        formData
      );
      setQuestions([...questions, response.data.question]);
      setMessage('Question added successfully!');
      setFormData({
        question: '',
        options: ['', '', '', ''],
        correctOption: '',
      });
    } catch (error) {
      setMessage('Error adding question.');
      console.error(error);
    }
  };

  // Delete question
  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.delete(
        `https://mc-qweb-backend.vercel.app/user/course/${id}/delete-question/${questionId}`
      );
      setQuestions(questions.filter((q) => q._id !== questionId));
      setMessage('Question deleted successfully!');
    } catch (error) {
      setMessage('Error deleting question.');
      console.error(error);
    }
  };

  return (
    <Box sx={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      {/* Subject Name */}
      <Typography variant="h4" gutterBottom>
        {subjectName || 'Loading...'}
      </Typography>

      {/* Form to add new question */}
      <Typography variant="h5" gutterBottom>
        Add New Question
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Question"
          value={formData.question}
          onChange={(e) =>
            setFormData({ ...formData, question: e.target.value })
          }
          sx={{ marginBottom: '10px' }}
        />

        {formData.options.map((opt, index) => (
          <TextField
            key={index}
            fullWidth
            label={`Option ${index + 1}`}
            value={opt}
            onChange={(e) => handleInputChange(index, e.target.value)}
            sx={{ marginBottom: '10px' }}
          />
        ))}

        <TextField
          fullWidth
          select
          label="Correct Option"
          value={formData.correctOption}
          onChange={(e) =>
            setFormData({ ...formData, correctOption: e.target.value })
          }
          sx={{ marginBottom: '20px' }}
        >
          {formData.options.map((opt, index) => (
            <MenuItem key={index} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </TextField>

        {message && <Typography color="error">{message}</Typography>}

        <Button type="submit" variant="contained" fullWidth>
          Save Question
        </Button>
      </form>

      {/* Table to display existing questions */}
      {questions.length > 0 && (
        <Box sx={{ marginBottom: '20px', marginTop: '40px' }}>
          <Typography variant="h5" gutterBottom>
            Existing Questions
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Question</TableCell>
                  <TableCell>Options</TableCell>
                  <TableCell>Correct Option</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.map((q) => (
                  <TableRow key={q._id}>
                    <TableCell>{q.question}</TableCell>
                    <TableCell>
                      <ul>
                        {q.options.map((opt, idx) => (
                          <li key={idx}>{opt}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>{q.correctOption}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteQuestion(q._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default AddQuestion;
