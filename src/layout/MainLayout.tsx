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
  padding: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('md')]: {
    marginLeft: open ? DRAWER_WIDTH : 0,
    width: open ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
  },
  backgroundColor: theme.palette.background.default,
}));

export const MainLayout: FC<MainLayoutProps> = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      flexDirection: { xs: 'column', md: 'row' }
    }}>
      <Header onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
      <SidebarContainer
        toggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
      />
      <Main open={sidebarOpen}>
        <Box
          sx={{
            mt: { xs: '56px', md: '64px' },
            minHeight: { xs: 'calc(100vh - 56px)', md: 'calc(100vh - 64px)' },
            width: '100%',
            maxWidth: '1600px',
            mx: 'auto',
            p: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Outlet />
        </Box>
      </Main>
    </Box>
  );
};