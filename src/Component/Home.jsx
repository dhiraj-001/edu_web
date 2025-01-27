import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Box,
} from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        fontFamily: 'sans-serif',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: 'primary.gradient' }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            EnL
          </Typography>
          <Button
            href="/login"
            variant="contained"
            color="secondary"
            sx={{ textTransform: 'none' }}
          >
            Login/Sign-up
          </Button>
        </Toolbar>
      </AppBar>

      {/* Banner Section */}
      <Box
        sx={{
          position: 'relative',
          height: 320,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'primary.light',
          color: 'common.white',
          fontWeight: 'bold',
          fontSize: 32,
          textAlign: 'center',
          boxShadow: 3,
        }}
      >
        <img
          src="banner.jpeg"
          alt="Banner"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.6,
          }}
        />
        <Typography variant="h3" sx={{ position: 'relative' }}>
          Educational Website
        </Typography>
      </Box>

      {/* Events Section */}
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            bgcolor: 'white',
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          EVENTS
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {['Event 1', 'Event 2'].map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={4}
                sx={{
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'success.light',
                  color: 'common.white',
                  fontWeight: 'bold',
                  fontSize: 24,
                  '&:hover': {
                    bgcolor: 'success.dark',
                    transform: 'scale(1.05)',
                  },
                  transition: '0.3s',
                }}
              >
                {event}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Small Events Section */}
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <Grid container spacing={3} justifyContent="center">
          {['Small Event 1', 'Small Event 2', 'Small Event 3'].map(
            (event, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper
                  elevation={4}
                  sx={{
                    height: 150,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'warning.light',
                    color: 'common.white',
                    fontWeight: 'bold',
                    fontSize: 20,
                    '&:hover': {
                      bgcolor: 'warning.dark',
                      transform: 'scale(1.05)',
                    },
                    transition: '0.3s',
                  }}
                >
                  {event}
                </Paper>
              </Grid>
            )
          )}
        </Grid>
      </Container>

      {/* MCQ Section */}
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            bgcolor: 'white',
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          MCQ
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {['MCQ 1', 'MCQ 2', 'MCQ 3', 'MCQ 4'].map((mcq, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={4}
                sx={{
                  height: 120,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'secondary.light',
                  color: 'common.white',
                  fontWeight: 'bold',
                  fontSize: 18,
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                    transform: 'scale(1.05)',
                  },
                  transition: '0.3s',
                }}
              >
                {mcq}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'common.white',
          py: 3,
          textAlign: 'center',
          mt: 8,
        }}
      >
        <Typography>&copy; 2025 EnL. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Home;
