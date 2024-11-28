import { Box, Container, IconButton } from '@mui/material';

import { ChevronRight } from '@mui/icons-material';
import { Outlet } from 'react-router-dom';
import { SidebarContainer } from '../features/sidebar/container/SidebarContainer';
import { useState } from 'react';

export const SidebarLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <SidebarContainer
        toggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
      />
      <Box
        sx={{
          marginLeft: sidebarOpen ? '16.666667%' : '0',
          width: sidebarOpen ? '83.33333%' : '100%',
          transition: 'margin-left 0.225s ease, width 0.225s ease',
          minHeight: '100vh',
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
      {!sidebarOpen && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleSidebar}
          edge="start"
          sx={{
            position: 'fixed',
            top: '50%',
            left: '12px',
            transform: 'translateY(-50%)',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <ChevronRight />
        </IconButton>
      )}
    </>
  );
};
