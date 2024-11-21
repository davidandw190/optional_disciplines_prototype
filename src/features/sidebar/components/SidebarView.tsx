import {
  Assignment,
  AutoMode,
  Book,
  ChevronLeft,
  DarkMode,
  LightMode,
  Logout,
  MenuBook,
  Person,
  School
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Dialog,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography
} from '@mui/material';

import { Link } from 'react-router-dom';
// import { RootState } from '../../../store/store';
import { SidebarNavItem } from './SidebarNavItem';
import { useSelector } from 'react-redux';
import uvtLogo from '../../../assets/uvt-logo.png';

interface SidebarViewProps {
  menuOpen: boolean;
  anchorElement: HTMLElement | null;
  handleMenuOpen: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleMenuClose: () => void;
  handleLogout: () => void;
  enrollments?: any[];
  toggleSidebar: () => void;
  sidebarOpen: boolean;
  handleChooseTheme: (theme: 'dark' | 'light' | 'system') => void;
  handleDialogOpen: () => void;
  handleDialogClose: () => void;
  dialogOpen: boolean;
}

const navigationItems = [
  {
    title: 'Dashboard',
    icon: <School />,
    path: '/dashboard'
  },
  {
    title: 'Optional Disciplines',
    icon: <Book />,
    path: '/optional-disciplines'
  },
  {
    title: 'Complementary Disciplines',
    icon: <MenuBook />,
    path: '/complementary-disciplines'
  },
  {
    title: 'My Enrollments',
    icon: <Assignment />,
    path: '/enrollments'
  },
  {
    title: 'Thesis',
    icon: <MenuBook />,
    path: '/thesis'
  },
  {
    title: 'Profile',
    icon: <Person />,
    path: '/profile'
  }
];

export const SidebarView: React.FC<SidebarViewProps> = ({
  menuOpen,
  anchorElement,
  handleMenuOpen,
  handleMenuClose,
  handleLogout,
  toggleSidebar,
  sidebarOpen,
  handleChooseTheme,
  handleDialogOpen,
  handleDialogClose,
  dialogOpen
}) => {
  //@ts-ignore
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return null;

  return (
    <>
      <Drawer
        variant="persistent"
        anchor="left"
        open={sidebarOpen}
        sx={{
          width: '16.666667%',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '16.666667%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }
        }}
      >
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <Stack alignItems="center" sx={{ my: 3 }}>
            <Link to="/">
              <Box
                component="img"
                sx={{ maxWidth: '50%', mb: 1 }}
                src={uvtLogo}
                alt="UVT Logo"
              />
            </Link>
            <Typography variant="h6">Student Portal</Typography>
          </Stack>

          <List>
            {navigationItems.map((item) => (
              <SidebarNavItem
                key={item.path}
                icon={item.icon}
                title={item.title}
                path={item.path}
              />
            ))}
          </List>
        </Box>

        <Box>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={handleMenuOpen}>
              <ListItemIcon>
                <Avatar>{user.firstName[0]}</Avatar>
              </ListItemIcon>
              <ListItemText
                primary={`${user.firstName} ${user.lastName}`}
                secondary={user.email}
              />
            </ListItemButton>
          </ListItem>
        </Box>

        <IconButton
          onClick={toggleSidebar}
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        >
          <ChevronLeft />
        </IconButton>
      </Drawer>

      <Menu
        anchorEl={anchorElement}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={handleDialogOpen}>
          <ListItemIcon>
            <DarkMode />
          </ListItemIcon>
          <ListItemText primary="Theme" />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </MenuItem>
      </Menu>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Select theme</DialogTitle>
        <List>
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleChooseTheme('dark')}>
              <ListItemIcon>
                <DarkMode />
              </ListItemIcon>
              <ListItemText primary="Dark" />
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleChooseTheme('light')}>
              <ListItemIcon>
                <LightMode />
              </ListItemIcon>
              <ListItemText primary="Light" />
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleChooseTheme('system')}>
              <ListItemIcon>
                <AutoMode />
              </ListItemIcon>
              <ListItemText primary="System" />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </>
  );
};