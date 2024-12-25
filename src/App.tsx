import { Box, CssBaseline, useMediaQuery } from '@mui/material';

import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { RootState } from './store/store';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from './utils/utils';
import { useSelector } from 'react-redux';

const App: FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <ThemeProvider theme={getTheme(theme, prefersDarkMode)}>
      <CssBaseline />
      <Box 
        sx={{ 
          display: 'flex', 
          minHeight: '100vh',
          maxWidth: '100vw',
          overflow: 'hidden',
          flexDirection: { xs: 'column', md: 'row' } // Stack vertically on mobile
        }}
      >
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};


export default App;