import { Box, CircularProgress, Typography } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';

import { FC } from 'react';
import { useAuth } from '../contexts/auth.context';
import { useStudent } from '../contexts/student.context';

const ProtectedRoute: FC = () => {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { student, isLoading: isStudentLoading } = useStudent();

  const isLoading = isAuthLoading || isStudentLoading;

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
        {/* <Typography variant="body1" sx={{ mt: 2 }}>
          {isAuthLoading ? 'Verifying your credentials...' : 'Loading your profile...'}
        </Typography> */}
      </Box>
    );
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (!student) {
    console.log('Student data missing, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
