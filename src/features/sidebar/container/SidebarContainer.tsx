import { AppDispatch } from '../../../store/store';
import { SidebarView } from '../components/SidebarView';
import { setTheme } from '../slices/theme.slice';
import { useDispatch } from 'react-redux';
// import { useGetUserEnrollmentsQuery } from '../../enrollments/api/enrollmentsApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface SidebarContainerProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

export const SidebarContainer: React.FC<SidebarContainerProps> = ({
  toggleSidebar,
  sidebarOpen
}) => {
  
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  
  // const { data: enrollments } = useGetUserEnrollmentsQuery();

  const enrollments: any[] | undefined = [];

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
    // TODO: we should handle logout logic
    navigate('/login');
  };

  return (
    <SidebarView
      menuOpen={Boolean(anchorElement)}
      anchorElement={anchorElement}
      handleMenuOpen={handleMenuOpen}
      handleMenuClose={handleMenuClose}
      handleLogout={handleLogout}
      enrollments={enrollments}
      toggleSidebar={toggleSidebar}
      sidebarOpen={sidebarOpen}
      handleChooseTheme={handleChooseTheme}
      handleDialogOpen={handleDialogOpen}
      handleDialogClose={handleDialogClose}
      dialogOpen={dialogOpen}
    />
  );
};