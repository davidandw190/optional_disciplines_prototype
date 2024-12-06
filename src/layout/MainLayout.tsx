import { Box, styled } from '@mui/material';
import { FC, useState } from 'react';

import { DRAWER_WIDTH } from '../config/layout.config';
import { Header } from './Header';
import { MainLayoutProps } from '../types/layout/layout.types';
import { Outlet } from 'react-router-dom';
import { SidebarContainer } from '../features/sidebar/container/SidebarContainer';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  width: '100%',

  ...(open && {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundSize: '20px 20px',
}));

export const MainLayout: FC<MainLayoutProps> = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', minWidth: '1600px' }}>
      <Header onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
      <SidebarContainer
        toggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
      />
      <Main open={sidebarOpen}>
        <Box
          sx={{
            mt: { xs: 7, sm: 8 },
            minHeight: 'calc(100vh - 84px)',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              width: '100%',
              padding: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Main>
    </Box>
  );
};
