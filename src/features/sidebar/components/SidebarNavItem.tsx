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
  Chip,
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
  useTheme,
} from '@mui/material';
import { FC, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { EnrollmentPeriod } from '../../../types/disciplines/disciplines.types';
import { EnrollmentPeriodType } from '../../../types/disciplines/disciplines.enums';
import { getEnrollmentPeriodStatus } from '../../mocks/enrollment-periods.mock';
import { useGetEligibleEnrollmentPeriodsQuery } from '../../../api/enrollmentPeriods/enrollmentPeriodsApi';
import { useStudent } from '../../../contexts/student.context';
import uvtLogo from '../../../assets/uvt-logo.png';

const DRAWER_WIDTH = '340px';

// Helper functions for enrollment period handling
const getEnrollmentPeriodPath = (period: EnrollmentPeriod) => {
  const periodId = period.id.toString();
  return `/enrollment-periods/${periodId}/${period.type.toLowerCase().replace('_', '-')}`;
};

const getEnrollmentPeriodTitle = (type: EnrollmentPeriodType) => {
  switch (type) {
    case EnrollmentPeriodType.ELECTIVE_DISCIPLINES:
      return 'Elective Disciplines';
    case EnrollmentPeriodType.COMPLEMENTARY_DISCIPLINES:
      return 'Complementary Disciplines';
    case EnrollmentPeriodType.THESIS_REGISTRATION:
      return 'Thesis Registration';
  }
};

const getEnrollmentPeriodIcon = (type: EnrollmentPeriodType) => {
  switch (type) {
    case EnrollmentPeriodType.ELECTIVE_DISCIPLINES:
      return <Book />;
    case EnrollmentPeriodType.COMPLEMENTARY_DISCIPLINES:
      return <MenuBook />;
    case EnrollmentPeriodType.THESIS_REGISTRATION:
      return <Assignment />;
  }
};

interface NavigationItem {
  title: string;
  icon: JSX.Element;
  path: string;
  badge?: string;
  badgeColor?: 'success' | 'warning' | 'error' | 'info' | 'default';
  disabled?: boolean;
}

interface SidebarViewProps {
  menuOpen: boolean;
  anchorElement: HTMLElement | null;
  handleMenuOpen: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleMenuClose: () => void;
  handleLogout: () => void;
  toggleSidebar: () => void;
  sidebarOpen: boolean;
  handleChooseTheme: (theme: 'dark' | 'light' | 'system') => void;
  handleDialogOpen: () => void;
  handleDialogClose: () => void;
  dialogOpen: boolean;
  variant: 'temporary' | 'persistent';
}

export const SidebarView: FC<SidebarViewProps> = ({
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
  const theme = useTheme();
  const location = useLocation();
  const { student } = useStudent();

  const { data: enrollmentPeriods } = useGetEligibleEnrollmentPeriodsQuery({
    yearOfStudy: student?.yearOfStudy ?? 1,
    semester: student?.semester ?? 1,
    specialization: student?.specialization ?? '',
  });

  const navigationItems = useMemo(() => {
    const baseItems: NavigationItem[] = [
      {
        title: 'Dashboard',
        icon: <School />,
        path: '/dashboard',
      },
    ];

    if (enrollmentPeriods?.length) {
      const activePeriodsMap = new Map<string, EnrollmentPeriod>();
      
      enrollmentPeriods.forEach(period => {
        const status = getEnrollmentPeriodStatus(period);
        const existingPeriod = activePeriodsMap.get(period.type);
        const existingStatus = existingPeriod 
          ? getEnrollmentPeriodStatus(existingPeriod) 
          : null;

        if (!existingPeriod || status === 'active' || 
            (status === 'upcoming' && existingStatus === 'ended')) {
          activePeriodsMap.set(period.type, period);
        }
      });

      Object.values(EnrollmentPeriodType).forEach(type => {
        const period = activePeriodsMap.get(type);
        const status = period ? getEnrollmentPeriodStatus(period) : undefined;
        
        baseItems.push({
          title: getEnrollmentPeriodTitle(type),
          icon: getEnrollmentPeriodIcon(type),
          path: period ? getEnrollmentPeriodPath(period) : '#',
          badge: status === 'active' ? 'Active' : undefined,
          badgeColor: 'success',
          disabled: !period || status !== 'active'
        });
      });
    }

    // the static navigation items
    return [
      ...baseItems,
      {
        title: 'My Enrollments',
        icon: <Assignment />,
        path: '/enrollments',
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
      }
    ];
  }, [enrollmentPeriods]);

  const drawerContent = useMemo(() => (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
    }}>
      {/* Logo and Title Section */}
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

      {/* Navigation Items */}
      <List sx={{
        flex: 1,
        px: 1,
        py: 1,
        '& .MuiListItem-root': {
          width: 'auto',
          mx: 0.5,
        },
      }}>
        {navigationItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname.startsWith(item.path)}
              disabled={item.disabled}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                color: item.disabled
                  ? 'text.disabled'
                  : location.pathname.startsWith(item.path)
                  ? 'primary.main'
                  : 'text.primary',
                '&.Mui-disabled': {
                  opacity: 0.7,
                  cursor: 'not-allowed',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'inherit',
                  minWidth: 40,
                  opacity: item.disabled ? 0.5 : 1,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontWeight: location.pathname.startsWith(item.path) ? 600 : 400,
                  sx: { opacity: item.disabled ? 0.7 : 1 },
                }}
              />
              {item.badge && (
                <Chip
                  label={item.badge}
                  size="small"
                  color={item.badgeColor}
                  sx={{
                    ml: 1,
                    height: 24,
                    opacity: item.disabled ? 0.7 : 1,
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* User Profile Section */}
      <Box>
        <Divider />
        <ListItem sx={{
          p: 1.5,
          '&:hover': { backgroundColor: 'action.hover' },
        }}>
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
                {student?.firstName[0]}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={`${student?.firstName} ${student?.lastName}`}
              secondary={student?.email}
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
  ), [navigationItems, student, handleMenuOpen, location.pathname]);

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

      {/* Theme and Settings Menu */}
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

      {/* Theme Selection Dialog */}
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
                onClick={() => handleChooseTheme(item.value as 'dark' | 'light' | 'system')}
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