import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  styled,
} from '@mui/material';

import { FC } from 'react';
import { Menu } from '@mui/icons-material';

interface HeaderProps {
  onMenuClick: () => void;
}

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
          UVT Enrollment Platform
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
