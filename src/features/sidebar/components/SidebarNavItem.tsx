import { Link, useLocation } from 'react-router-dom';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { ReactElement } from 'react';

interface SidebarNavItemProps {
  icon: ReactElement;
  title: string;
  path: string;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  icon,
  title,
  path,
}) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        to={path}
        sx={{
          py: 1.5,
          '&.Mui-selected': {
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            '& .MuiListItemIcon-root': {
              color: 'primary.contrastText',
            },
          },
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
        selected={isActive}
      >
        <ListItemIcon
          sx={{
            minWidth: 40,
            color: isActive ? 'inherit' : 'text.primary',
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            variant: 'body1',
            fontWeight: isActive ? 500 : 400,
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};
