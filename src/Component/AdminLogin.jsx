import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import Cookies from 'js-cookie'; // Import js-cookie
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from '@mui/material';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'https://mc-qweb-backend.vercel.app/user/adminlogin',
        {
          email,
          password,
        }
      );

      // Handle success (token received)
      if (response.data.success) {
        console.log('Login successful');
        // Store the token in a cookie
        Cookies.set('admin_token', response.data.token, { expires: 1 }); // Cookie will expire in 1 day
        setTimeout(() => {
          window.location.href = '/admin'; // Replace with the route where you want to redirect
        }, 2000);
      } else {
        // Handle failure
        setError(response.data.msg); // Display error message
      }
    } catch (err) {
      console.error('Login failed', err);
      setError('Error occurred during login'); // Handle error in case of a failed request
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Admin Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
