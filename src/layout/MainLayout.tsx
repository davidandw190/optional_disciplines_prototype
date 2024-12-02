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
  padding: theme.spacing(3),
  transition: theme.transitions.create(['margin', 'width', 'padding'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
  ...(open && {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(['margin', 'width', 'padding'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor:
    theme.palette.mode === 'light'
      ? '#F5F7FA'
      : theme.palette.background.default,
  backgroundImage:
    theme.palette.mode === 'light'
      ? 'linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)'
      : 'none',
  backgroundSize: '20px 20px',
}));

export const MainLayout: FC<MainLayoutProps> = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
      <SidebarContainer
        toggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
      />
      <Main open={sidebarOpen}>
        <Box
          sx={{
            mt: { xs: 7, sm: 8 },
            minHeight: 'calc(100vh - 64px)',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: (_theme) => ({
                xs: '100%',
                sm: '600px',
                md: '900px',
                lg: '1200px',
                xl: '1400px',
              }),
              mx: 'auto',
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Main>
    </Box>
  );
};
