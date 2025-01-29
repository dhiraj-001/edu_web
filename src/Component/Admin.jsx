import React, { useState } from 'react';
import { Box, Button, Typography, Divider, TextField } from '@mui/material';

const AdminPage = () => {
  const [selectedContent, setSelectedContent] = useState(''); // State to handle selected content
  const [isAdding, setIsAdding] = useState(false); // State to handle showing input field for adding course
  const [newCourse, setNewCourse] = useState(''); // State to handle the new course input value

  const handleButtonClick = (content) => {
    setSelectedContent(content);
    setIsAdding(false); // Reset input when switching between sections
    setNewCourse(''); // Reset input field value
  };

  const handleAddNewClick = () => {
    setIsAdding(true); // Show input field for adding new course
  };

  const handleInputChange = (event) => {
    setNewCourse(event.target.value); // Update course name input value
  };

  const handleSaveNewCourse = () => {
    if (newCourse.trim()) {
      // Here, you would save the new course (e.g., make an API call)
      console.log('New Course added:', newCourse);
      setIsAdding(false); // Hide input field after saving
      setNewCourse(''); // Clear input field
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Left Navigation */}
      <Box sx={{ width: '200px', backgroundColor: '#f4f4f4', padding: '16px' }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => handleButtonClick('event')}
          sx={{ marginBottom: '8px' }}
        >
          Event
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => handleButtonClick('milestone')}
          sx={{ marginBottom: '8px' }}
        >
          Milestone
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => handleButtonClick('course')}
          sx={{ marginBottom: '8px' }}
        >
          Course
        </Button>
      </Box>

      {/* Right Content */}
      <Box sx={{ flex: 1, padding: '16px' }}>
        {selectedContent === 'course' && (
          <div>
            <Typography variant="h4">Course</Typography>
            <Divider sx={{ margin: '16px 0' }} />
            <Typography variant="body1">Here are your courses:</Typography>

            {/* "Add New" Button */}
            {!isAdding && (
              <Button
                variant="contained"
                sx={{ marginTop: '16px' }}
                onClick={handleAddNewClick}
              >
                Add New Course
              </Button>
            )}

            {/* Input Field for New Course */}
            {isAdding && (
              <div>
                <TextField
                  label="Course Name"
                  variant="outlined"
                  fullWidth
                  value={newCourse}
                  onChange={handleInputChange}
                  sx={{ marginTop: '16px' }}
                />
                <Button
                  variant="contained"
                  sx={{ marginTop: '16px' }}
                  onClick={handleSaveNewCourse}
                >
                  Save Course
                </Button>
              </div>
            )}
          </div>
        )}

        {selectedContent === 'event' && (
          <div>
            <Typography variant="h4">Event</Typography>
            <Divider sx={{ margin: '16px 0' }} />
            <Typography variant="body1">Already added events:</Typography>
            <Button variant="contained" sx={{ marginTop: '16px' }}>
              Add New Event
            </Button>
          </div>
        )}

        {selectedContent === 'milestone' && (
          <div>
            <Typography variant="h4">Milestone</Typography>
            <Divider sx={{ margin: '16px 0' }} />
            <Typography variant="body1">Already added milestones:</Typography>
            <Button variant="contained" sx={{ marginTop: '16px' }}>
              Add New Milestone
            </Button>
          </div>
        )}

        {!selectedContent && (
          <Typography variant="body1">
            Please select an option from the left menu.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default AdminPage;
