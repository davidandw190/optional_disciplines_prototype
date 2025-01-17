import { Box, Drawer, IconButton } from '@mui/material';
import { FC, useMemo } from 'react';

import { ChevronLeft } from '@mui/icons-material';
import { SidebarLogo } from '../components/SidebarLogo';
import { SidebarNavigation } from './SidebarNavigation';
import { SidebarUserProfile } from '../components/SidebarUserProfile';
import { ThemeDialog } from '../components/ThemeDialogOptions';
import { UserMenu } from '../components/UserMenu';
import { getNavigationItems } from '../hooks/navigationHelpers';
import { useGetEligibleEnrollmentPeriodsQuery } from '../../../api/enrollmentPeriods/enrollmentPeriodsApi';
import { useStudent } from '../../../contexts/student.context';

const DRAWER_WIDTH = '340px';

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
  const { student } = useStudent();

  if (!student) {
    return;
  }

  const { data: enrollmentPeriods } = useGetEligibleEnrollmentPeriodsQuery({
    yearOfStudy: student?.yearOfStudy ?? 1,
    semester: student?.semester ?? 1,
    specialization: student?.specialization ?? '',
  });

  const navigationItems = useMemo(
    () => getNavigationItems(enrollmentPeriods),
    [enrollmentPeriods]
  );

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <SidebarLogo />
      <SidebarNavigation items={navigationItems} />
      <SidebarUserProfile student={student} onMenuOpen={handleMenuOpen} />
    </Box>
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

      <UserMenu
        anchorEl={anchorElement}
        open={menuOpen}
        onClose={handleMenuClose}
        onThemeClick={handleDialogOpen}
        onLogout={handleLogout}
      />

      <ThemeDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onThemeSelect={handleChooseTheme}
      />
    </>
  );
};
