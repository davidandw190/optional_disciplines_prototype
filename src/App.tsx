import { Box, CssBaseline } from '@mui/material';

import { AuthProvider } from './contexts/auth.context';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { StudentProvider } from './contexts/student.context';
import { ThemeProvider } from './contexts/theme.context';
import { ToastContainer } from './components/ToastContainer';

const App: FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <StudentProvider>
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              minHeight: '100vh',
              maxWidth: '100vw',
              overflow: 'hidden',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Outlet />
          </Box>
          <ToastContainer />
        </StudentProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
