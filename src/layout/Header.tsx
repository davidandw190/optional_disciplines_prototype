import { AppBar, IconButton, Toolbar, Typography, styled } from '@mui/material';

import { FC } from 'react';
import { HeaderProps } from '../types/layout/layout.types';
import { Menu } from '@mui/icons-material';

const pathTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/elective-disciplines': 'Elective Disciplines',
  '/complementary-disciplines': 'Complementary Disciplines',
  '/enrollments': 'My Enrollments',
  '/thesis': 'Thesis',
  '/profile': 'Profile',
};

export const Header: FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onMenuClick}
          edge="start"
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          FMI Enroll
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
