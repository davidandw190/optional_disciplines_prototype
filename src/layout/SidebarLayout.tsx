import {
  Box,
  Container,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { ChevronRight } from '@mui/icons-material';
import { Outlet } from 'react-router-dom';
import { SidebarContainer } from '../features/sidebar/container/SidebarContainer';

const DRAWER_WIDTH = 340;

export const SidebarLayout = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [sidebarOpen, setSidebarOpen] = useState(isDesktop);

  useEffect(() => {
    setSidebarOpen(isDesktop);
  }, [isDesktop]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: { md: 'absolute' },
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: theme.zIndex.drawer,
          height: '100vh',
        }}
      >
        <SidebarContainer
          variant={isDesktop ? 'persistent' : 'temporary'}
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
          transition: theme.transitions.create('width', {
            duration: theme.transitions.duration.enteringScreen,
            easing: theme.transitions.easing.easeOut,
          }),

          [theme.breakpoints.up('md')]: {
            marginLeft: DRAWER_WIDTH,
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            py: { xs: 2, sm: 3 },
            height: '100%',
          }}
        >
          <Outlet />
        </Container>
      </Box>

      {/* Toggle button */}
      {!sidebarOpen && isDesktop && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleSidebar}
          edge="start"
          sx={{
            position: 'fixed',
            top: '50%',
            left: 12,
            transform: 'translateY(-50%)',
            zIndex: theme.zIndex.drawer + 1,
            bgcolor: 'background.paper',
            boxShadow: 1,
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <ChevronRight />
        </IconButton>
      )}
    </Box>
  );
};
