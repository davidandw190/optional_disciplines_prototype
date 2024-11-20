import {
  Book,
  Dashboard,
  ExpandLess,
  ExpandMore,
  Menu,
  School,
} from '@mui/icons-material';
import {
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
import { FC, useState } from 'react';

import { useNavigate } from 'react-router-dom';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const SideBar: FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [disciplinesOpen, setDisciplinesOpen] = useState(true);

  const handleDisciplinesClick = () => {
    setDisciplinesOpen(!disciplinesOpen);
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: (theme) => theme.palette.background.paper,
          borderRight: (theme) => `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <DrawerHeader>
        <IconButton onClick={onClose}>
          <Menu />
        </IconButton>
      </DrawerHeader>

      <List component="nav">
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/dashboard')}>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText 
              primary="Dashboard" 
              primaryTypographyProps={{
                variant: 'body1',
                fontWeight: 500,
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={handleDisciplinesClick}>
            <ListItemIcon>
              <School />
            </ListItemIcon>
            <ListItemText 
              primary="Optional Disciplines"
              primaryTypographyProps={{
                variant: 'body1',
                fontWeight: 500,
              }}
            />
            {disciplinesOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={disciplinesOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem disablePadding>
              <ListItemButton 
                sx={{ 
                  pl: 4,
                  '&:hover': {
                    backgroundColor: (theme) => 
                      theme.palette.action.hover,
                  },
                }}
                onClick={() => navigate('/disciplines/year-3')}
              >
                <ListItemIcon>
                  <Book />
                </ListItemIcon>
                <ListItemText 
                  primary="Year 3" 
                  primaryTypographyProps={{
                    variant: 'body2',
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};