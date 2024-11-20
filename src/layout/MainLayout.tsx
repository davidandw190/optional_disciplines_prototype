import { Box, styled } from '@mui/material';
import { FC, ReactNode, useState } from 'react';

import { Header } from './Header';
import { SideBar } from './SideBar';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 240,
  }),
}));

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex' }}>
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <SideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Main open={sidebarOpen}>
        <Box sx={{ mt: 8 }}>{children}</Box>
      </Main>
    </Box>
  );
};