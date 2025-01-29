import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie'; // Import js-cookie
import { useNavigate } from 'react-router-dom'; // For redirecting

const SignUp = () => {
  const [serverMessage, setServerMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must be less than 20 characters')
        .required('Username is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          'http://localhost:5000/user/register',
          {
            name: values.username,
            email: values.email,
            password: values.password,
          }
        );

        // Hash the email before storing (for basic security)
        const hashedEmail = btoa(values.email); // Base64 encode email
        Cookies.set('auth_token', response.data.token, { expires: 1 }); // Store in cookie for 7 days

        setServerMessage({
          type: 'success',
          text: 'User registered successfully! Redirecting...',
        });

        setTimeout(() => {
          navigate('/'); // Redirect to home page after signup
        }, 2000);
      } catch (err) {
        setServerMessage({
          type: 'error',
          text: err.response?.data?.error || 'Registration failed',
        });
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <Paper sx={{ padding: 3, mt: 5 }}>
        <Typography variant="h4" gutterBottom align="center">
          Sign Up
        </Typography>

        {serverMessage && (
          <Typography
            color={serverMessage.type === 'error' ? 'error' : 'primary'}
            align="center"
            sx={{ mb: 2 }}
          >
            {serverMessage.text}
          </Typography>
        )}

        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            required
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            required
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            required
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            required
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Sign Up
          </Button>
        </form>
        <Typography variant="body1" sx={{ margin: '20px' }} align="center">
          Already have an account? <a href="/login">Log in</a>
        </Typography>
      </Paper>
    </Container>
  );
};

export default SignUp;
