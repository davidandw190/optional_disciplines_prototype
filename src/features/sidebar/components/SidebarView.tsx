import {
  Assignment,
  AutoMode,
  Book,
  ChevronLeft,
  DarkMode,
  HelpOutline,
  LightMode,
  Logout,
  MenuBook,
  Person,
  School,
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
  Typography,
} from '@mui/material';

import { Link } from 'react-router-dom';
import { SidebarNavItem } from './SidebarNavItem';
import { useMemo } from 'react';
import uvtLogo from '../../../assets/uvt-logo.png';

const DRAWER_WIDTH = '340px';

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
  variant: 'temporary' | 'persistent';
}

const navigationItems = [
  {
    title: 'Dashboard',
    icon: <School />,
    path: '/dashboard',
  },
  {
    title: 'Elective Disciplines',
    icon: <Book />,
    path: '/elective-disciplines',
  },
  {
    title: 'Complementary Disciplines',
    icon: <MenuBook />,
    path: '/complementary-disciplines',
  },
  {
    title: 'My Enrollments',
    icon: <Assignment />,
    path: '/enrollments',
  },
  {
    title: 'Thesis',
    icon: <MenuBook />,
    path: '/thesis',
  },
  {
    title: 'Profile',
    icon: <Person />,
    path: '/profile',
  },
  {
    title: 'FAQ',
    icon: <HelpOutline />,
    path: '/faq',
  },
];

export const SidebarView: React.FC<SidebarViewProps> = ({
  menuOpen,
  anchorElement,
  handleMenuOpen,
  handleMenuClose,
  handleLogout,
  toggleSidebar,
  variant,
  sidebarOpen,
  handleChooseTheme,
  handleDialogOpen,
  handleDialogClose,
  dialogOpen,
}) => {
  const user = {
    firstName: 'Andrei-David',
    lastName: 'Nan',
    email: 'andrei.nan03@e-uvt.ro',
  };

  const drawerContent = useMemo(
    () => (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {/* logo and title section */}
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Box
              component="img"
              src={uvtLogo}
              alt="FMI Logo"
              sx={{
                width: '120px',
                height: 'auto',
                mb: 2,
                transition: 'transform 0.15s ease',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            />
          </Link>
          <Typography
            variant="h6"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              fontSize: '1.1rem',
              letterSpacing: '0.02em',
            }}
          >
            FMI Enroll
          </Typography>
        </Box>

        <Divider sx={{ mx: 2 }} />

        {/* navigation section */}
        <List
          sx={{
            flex: 1,
            px: 1,
            py: 1,
            '& .MuiListItem-root': {
              width: 'auto',
              mx: 0.5,
            },
          }}
        >
          {navigationItems.map((item) => (
            <SidebarNavItem
              key={item.path}
              icon={item.icon}
              title={item.title}
              path={item.path}
            />
          ))}
        </List>

        {/* user profile section */}
        <Box>
          <Divider />
          <ListItem
            sx={{
              p: 1.5,
              '&:hover': { backgroundColor: 'action.hover' },
            }}
          >
            <ListItemButton
              onClick={handleMenuOpen}
              sx={{
                px: 1.5,
                '& .MuiListItemText-root': {
                  overflow: 'hidden',
                },
              }}
            >
              <ListItemIcon>
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    width: 32,
                    height: 32,
                  }}
                >
                  {user.firstName[0]}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={`${user.firstName} ${user.lastName}`}
                secondary={user.email}
                primaryTypographyProps={{
                  variant: 'body2',
                  fontWeight: 600,
                  color: 'text.primary',
                }}
                secondaryTypographyProps={{
                  variant: 'caption',
                  color: 'text.secondary',
                }}
              />
            </ListItemButton>
          </ListItem>
        </Box>
      </Box>
    ),
    [user, handleMenuOpen]
  );

  return (
    <>
      <Drawer
        variant={variant}
        anchor="left"
        open={sidebarOpen}
        onClose={variant === 'temporary' ? toggleSidebar : undefined}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            bgcolor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider',
            boxSizing: 'border-box',
          },
          '& .MuiPaper-root': {
            boxShadow: variant === 'temporary' ? 24 : 'none',
          },
        }}
      >
        {drawerContent}
        {/* toggle button */}
        <IconButton
          onClick={toggleSidebar}
          size="small"
          sx={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            width: 32,
            height: 32,
            boxShadow: 1,
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <ChevronLeft fontSize="small" />
        </IconButton>
      </Drawer>

      {/* theme and logout menus */}
      <Menu
        anchorEl={anchorElement}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleDialogOpen}>
          <ListItemIcon>
            <DarkMode fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Theme" />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </MenuItem>
      </Menu>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        PaperProps={{
          sx: { minWidth: '300px' },
        }}
      >
        <DialogTitle>Select theme</DialogTitle>
        <List>
          {[
            { icon: <DarkMode />, label: 'Dark', value: 'dark' },
            { icon: <LightMode />, label: 'Light', value: 'light' },
            { icon: <AutoMode />, label: 'System', value: 'system' },
          ].map((item) => (
            <ListItem key={item.value} disableGutters>
              <ListItemButton
                onClick={() =>
                  handleChooseTheme(item.value as 'dark' | 'light' | 'system')
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};
