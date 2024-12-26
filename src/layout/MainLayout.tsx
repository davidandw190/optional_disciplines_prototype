import { Box, styled, useMediaQuery, useTheme } from '@mui/material';
import { DRAWER_WIDTH, HEADER_HEIGHT } from '../config/layout.config';
import { FC, useEffect, useState } from 'react';

import { Header } from './Header';
import { Outlet } from 'react-router-dom';
import { SidebarContainer } from '../features/sidebar/container/SidebarContainer';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  position: 'relative',
  width: '100%',
  minHeight: '100vh',
  transition: theme.transitions.create(['width'], {
    duration: theme.transitions.duration.enteringScreen,
    easing: theme.transitions.easing.easeOut,
  }),

  [theme.breakpoints.up('md')]: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
  },
}));

export const MainLayout: FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [sidebarOpen, setSidebarOpen] = useState(isDesktop);

  useEffect(() => {
    setSidebarOpen(isDesktop);
  }, [isDesktop]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: theme.zIndex.appBar,
        }}
      >
        <Header onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />
      </Box>

      <Box
        sx={{
          position: { md: 'absolute' },
          top: { md: HEADER_HEIGHT },
          left: 0,
          bottom: 0,
          zIndex: theme.zIndex.drawer,
          height: { md: `calc(100vh - ${HEADER_HEIGHT})` },
        }}
      >
        <SidebarContainer
          variant={isDesktop ? 'persistent' : 'temporary'}
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      </Box>

      <Main>
        <Box
          sx={{
            minHeight: `calc(100vh - ${HEADER_HEIGHT})`,
            width: '100%',
            overflow: 'auto',
            pt: HEADER_HEIGHT,
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: {
                xs: '100%',
                sm: '100%',
                md: '1200px',
                lg: '1400px',
                xl: '1800px',
              },
              mx: 'auto',
              px: { xs: 1, sm: 7, md: 8 },
              py: { xs: 1, sm: 4 },
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Main>
    </Box>
  );
};
