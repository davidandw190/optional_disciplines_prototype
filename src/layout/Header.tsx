import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

import { FC } from 'react';
import { HeaderProps } from '../types/layout/layout.types';
import { Menu } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

const pathTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/elective-disciplines': 'Elective Disciplines',
  '/complementary-disciplines': 'Complementary Disciplines',
  '/enrollments': 'My Enrollments',
  '/thesis': 'Thesis',
  '/profile': 'Profile',
};

export const Header: FC<HeaderProps> = ({ onMenuClick, sidebarOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: 'primary.main',
        borderBottom: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.12)',
        ml: sidebarOpen ? '280px' : 0,
        width: sidebarOpen ? 'calc(100% - 280px)' : '100%',
        transition:
          'margin-left 225ms cubic-bezier(0.4, 0, 0.2, 1), width 225ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      elevation={0}
    >
      <Box
        sx={{
          maxWidth: '1600px',
          width: '100%',
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, sm: 70 }, px: 0 }}>
          <IconButton
            color="inherit"
            aria-label="toggle sidebar"
            onClick={onMenuClick}
            edge="start"
            sx={{
              mr: 2,
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            <Menu />
          </IconButton>

          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ flexGrow: 1 }}
          >
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: 600,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                fontSize: '1.125rem',
              }}
            >
              FMI Enroll
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                pl: 2,
                borderLeft: '2px solid',
                borderColor: 'rgba(255, 255, 255, 0.12)',
                fontWeight: 500,
              }}
            >
              {pathTitles[currentPath] || 'Dashboard'}
            </Typography>
          </Stack>
        </Toolbar>
      </Box>
    </AppBar>
  );
};
