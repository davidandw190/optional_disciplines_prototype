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
  '/enrollments': 'My Enrollments',
  '/profile': 'Profile',
  '/faq': 'FAQ',
};

const getPathTitle = (currentPath: string): string => {
  if (currentPath.startsWith('/enrollment-periods')) {
    const parts = currentPath.split('/');
    // expected parts: ['', 'enrollment-periods', ':periodId', 'enrollment-type']
    const enrollmentType = parts[3];
    switch (enrollmentType) {
      case 'elective-disciplines':
        return 'Elective Disciplines';
      case 'complementary-disciplines':
        return 'Complementary Disciplines';
      case 'thesis-registration':
        return 'Thesis Registration';
      default:
        return 'Enrollment Period';
    }
  }
  return pathTitles[currentPath] || 'Dashboard';
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
        ml: sidebarOpen ? '320px' : 0,
        width: sidebarOpen ? 'calc(100% - 320px)' : '100%',
        transition:
          'margin-left 50ms cubic-bezier(0.4, 0, 0.2, 1), width 225ms cubic-bezier(0.4, 0, 0.2, 1)',
        height: 56,
      }}
      elevation={0}
    >
      <Box
        sx={{
          maxWidth: '1600px',
          width: '100%',
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
          height: '100%',
        }}
      >
        <Toolbar
          sx={{
            minHeight: '56px !important',
            height: '56px',
            px: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
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
              padding: '8px',
            }}
          >
            <Menu sx={{ fontSize: '1.25rem' }} />
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
                fontSize: '1rem',
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
                fontSize: '0.875rem',
              }}
            >
              {getPathTitle(currentPath)}
            </Typography>
          </Stack>
        </Toolbar>
      </Box>
    </AppBar>
  );
};
