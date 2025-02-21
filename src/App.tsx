import { Box, CssBaseline } from '@mui/material';

import { DisciplineSelectionProvider } from './contexts/discipline-selection.context';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { StudentProvider } from './contexts/student.context';
import { ThemeProvider } from './contexts/theme.context';

const App: FC = () => {
  return (
    <ThemeProvider>
      <StudentProvider>
        {/* <DisciplineSelectionProvider> */}
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
        {/* </DisciplineSelectionProvider> */}
      </StudentProvider>
    </ThemeProvider>
  );
};

export default App;
