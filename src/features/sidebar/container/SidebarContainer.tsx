import { useEffect, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

import { AppDispatch } from '../../../store/store';
import { SidebarView } from './SidebarView';
import { setTheme } from '../slices/theme.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface SidebarContainerProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
  variant: 'temporary' | 'persistent';
}

export const SidebarContainer: React.FC<SidebarContainerProps> = ({
  toggleSidebar,
  sidebarOpen,
  variant,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElement(null);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleChooseTheme = (theme: 'dark' | 'light' | 'system') => {
    dispatch(setTheme(theme));
    handleDialogClose();
    handleMenuClose();
  };

  const handleLogout = () => {
    navigate('/logout');
  };

  useEffect(() => {
    handleMenuClose();
  }, [isDesktop]);

  return (
    <SidebarView
      variant={variant}
      menuOpen={Boolean(anchorElement)}
      anchorElement={anchorElement}
      handleMenuOpen={handleMenuOpen}
      handleMenuClose={handleMenuClose}
      handleLogout={handleLogout}
      toggleSidebar={toggleSidebar}
      sidebarOpen={sidebarOpen}
      handleChooseTheme={handleChooseTheme}
      handleDialogOpen={handleDialogOpen}
      handleDialogClose={handleDialogClose}
      dialogOpen={dialogOpen}
    />
  );
};
