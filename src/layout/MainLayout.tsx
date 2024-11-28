import { Box, styled } from '@mui/material';
import { FC, useState } from 'react';

import { Header } from './Header';
import { MainLayoutProps } from '../types/layout/layout.types';
import { Outlet } from 'react-router-dom';
import { SidebarContainer } from '../features/sidebar/container/SidebarContainer';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  width: '100%',
  ...(open && {
    width: `calc(100% - ${240}px)`,
    marginLeft: 240,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
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
            backgroundColor: 'background.default',
          }}
        >
          <Outlet />
        </Box>
      </Main>
    </Box>
  );
};
