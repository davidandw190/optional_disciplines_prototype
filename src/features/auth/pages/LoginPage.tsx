import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { LockOutlined } from '@mui/icons-material';
import loginBanner from '../../../assets/login-banner.jpg';
import { useAuth } from '../../../contexts/auth.context';
import uvtLogo from '../../../assets/uvt-logo.png';

export const LoginPage: FC = () => {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [redirectingTo, setRedirectingTo] = useState<string>('/dashboard');
  const [attemptingLogin, setAttemptingLogin] = useState<boolean>(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const redirectPath =
      searchParams.get('redirect') ||
      sessionStorage.getItem('redirectPath') ||
      '/dashboard';

    setRedirectingTo(redirectPath);

    if (isAuthenticated && !isLoading) {
      console.log('Already authenticated, redirecting to:', redirectPath);
      navigate(redirectPath);
    }
  }, [isAuthenticated, isLoading, navigate, location.search]);

  const handleLogin = () => {
    setAttemptingLogin(true);
    // save current redirect path
    sessionStorage.setItem('redirectPath', redirectingTo);
    // trigger Keycloak login
    login();
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          background: (theme) => theme.palette.background.default,
        }}
      >
        <CircularProgress size={48} color="primary" />
        <Typography variant="h6" color="text.primary" sx={{ mt: 3 }}>
          Checking authentication...
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* Left side - Login Form */}
      <Grid
        item
        xs={12}
        md={5}
        lg={3.7}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          padding: { xs: 2, sm: 4, md: 6 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container maxWidth="sm" sx={{ mx: 'auto' }}>
          <Paper
            elevation={8}
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              backgroundColor: 'white',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {/* Logo and Title */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <Box
                  component="img"
                  src={uvtLogo}
                  alt="FMI Logo"
                  sx={{
                    width: '140px',
                    height: 'auto',
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h4"
                  component="h1"
                  fontWeight="bold"
                  textAlign="center"
                >
                  FMI Enroll
                </Typography>
              </Box>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4 }}
                textAlign="center"
              >
                Log in with your university account to access the enrollment
                platform for elective disciplines, complementary disciplines,
                and thesis registration.
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                startIcon={attemptingLogin ? null : <LockOutlined />}
                onClick={handleLogin}
                disabled={attemptingLogin || isLoading}
                sx={{
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 'bold',
                }}
              >
                {attemptingLogin ? (
                  <>
                    <CircularProgress
                      size={24}
                      color="inherit"
                      sx={{ mr: 1 }}
                    />
                    Redirecting to login...
                  </>
                ) : (
                  'Login with e-UVT Account'
                )}
              </Button>

              <Typography
                variant="caption"
                color="text.secondary"
                align="center"
                sx={{ mt: 3, display: 'block' }}
              >
                {/* © 2025 West University of Timisoara | Faculty of Mathematics and Computer Science */}
                © 2025 West University of Timisoara
              </Typography>
            </CardContent>
          </Paper>
        </Container>
      </Grid>

      {/* Right side - Image Background with overlay */}
      <Grid
        item
        xs={12}
        md={7}
        lg={8.3}
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background Image with blue overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${loginBanner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: alpha(theme.palette.primary.main, 0.4),
              backdropFilter: 'blur(2px)',
            },
          }}
        />
      </Grid>
    </Grid>
  );
};
