import { Box, CssBaseline } from '@mui/material';

import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './contexts/theme.context';

const App: FC = () => {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
};

export default App;
