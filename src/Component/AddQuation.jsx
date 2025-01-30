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
import Cookies from 'js-cookie';

const AddQuestion = () => {
  const { id } = useParams(); // Get course ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctOption: '',
  });
  const [message, setMessage] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [questions, setQuestions] = useState(
    JSON.parse(localStorage.getItem('tempQuestions')) || [] // Retrieve from local storage
  );

  useEffect(() => {
    fetchCourseData();
    // Fetch the questions from localStorage whenever the component mounts or updates
    const savedQuestions =
      JSON.parse(localStorage.getItem('tempQuestions')) || [];
    setQuestions(savedQuestions);
  }, []);

  // Fetch course data if token is valid
  const fetchCourseData = async () => {
    try {
      const response = await axios.get(
        `https://mc-qweb-backend.vercel.app/user/course/${id}`
      );
      setSubjectName(response.data.name);
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

  // Save the question temporarily to localStorage
  const handleAddToLocal = () => {
    const { question, options, correctOption } = formData;

    if (!question || options.some((opt) => !opt) || !correctOption) {
      setMessage('Please fill all fields.');
      return;
    }

    const newQuestion = {
      question,
      options,
      correctOption,
    };

    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    localStorage.setItem('tempQuestions', JSON.stringify(updatedQuestions)); // Save to localStorage

    setFormData({
      question: '',
      options: ['', '', '', ''],
      correctOption: '',
    });
    setMessage('Question added to temporary list!');
  };

  // Submit all stored questions to the backend
  const handleFinalSubmit = async () => {
    if (questions.length === 0) {
      setMessage('No questions to submit!');
      return;
    }

    try {
      const response = await axios.post(
        `https://mc-qweb-backend.vercel.app/user/course/${id}/add-question`,
        { questions }
      );
      console.log(questions);
      setMessage('All questions submitted successfully!');
      // Clear local storage after successful submission
      localStorage.removeItem('tempQuestions');
      setQuestions([]);
    } catch (error) {
      setMessage('Error submitting questions.');
      console.error(error);
    }
  };

  // Handle delete question from local storage
  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index); // Filter out the deleted question
    setQuestions(updatedQuestions); // Update state
    localStorage.setItem('tempQuestions', JSON.stringify(updatedQuestions)); // Update localStorage
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

      <form onSubmit={(e) => e.preventDefault()}>
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

        <Button variant="contained" onClick={handleAddToLocal} fullWidth>
          Add to Temporary List
        </Button>
      </form>

      {/* Table to display temporary questions */}
      {questions.length > 0 && (
        <Box sx={{ marginBottom: '20px', marginTop: '40px' }}>
          <Typography variant="h5" gutterBottom>
            Temporary Questions
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
                {questions.map((q, index) => (
                  <TableRow key={index}>
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
                        onClick={() => handleDeleteQuestion(index)} // Delete action
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

      {/* Final Submit Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleFinalSubmit}
        disabled={questions.length === 0}
        fullWidth
      >
        Final Submit
      </Button>
    </Box>
  );
};

export default AddQuestion;
